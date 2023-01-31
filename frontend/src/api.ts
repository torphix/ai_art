import { isProduction, remotehostname } from "./env";


export const addAuthRequest = (headers: any) => {
  if (isProduction === false) {
    // Dev
    const accessToken = localStorage.getItem('jwt-access');
    console.log(accessToken)
    headers['Authorization'] = `Bearer ${accessToken}`
    return headers
  }
			// Add csrf token to authe request

}

// CRUD methods
export const getData = async (url: string, headers: any, authenticate: boolean) => {
  if (authenticate) {
    console.log('yes')
    headers = await addAuthRequest(headers)
    console.log(headers['jwt-access'])
  }
  const response = await fetch(`http://${remotehostname}/${url}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: headers
  });
  return response;
};

export const postData = async (url: string, data: string | FormData, headers: any = {
  'Content-Type': 'application/json'
}, authenticate:boolean=false) => {

  if(authenticate){
    headers = addAuthRequest(headers)
  }
  console.log(headers)
  // Either enter a JSON serialised string or FormData
  const response = await fetch(`http://${remotehostname}/${url}`, {
    method: 'POST',
    credentials: 'same-origin',
    body: data,
    headers: headers
  });
  return response;
};


export const putData = async (url: string, data: any) => {
  try {
    const response = await fetch(`http://${remotehostname}/${url}`, {
      method: 'PUT',
      credentials: 'same-origin',
      body: data,
    });
    return response;
  } catch (error) {
    console.error(`Error in load function for /: ${error}`);
  }
};


// Websockets
export const openWebsocket = (url: string) => {
  const ws_schema = window.location.protocol === "http:" ? "ws" : "wss";
  // return new WebSocket(`${ws_schema}://${remotehostname}/${url}/`);
  return new WebSocket(`ws://${window.location.host}/${url}`)
}


export const blobToBase64 = (blob: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      resolve(reader.result);
    };
  });
};

export const multipartFileUploadS3Start = async (file: File, chunkSize: number) => {
  // Get presigned urls
  let startRes = await postData(
    'ml_models/multipart_file_upload/',
    JSON.stringify({
      filename: file.name,
      fileParts: Math.ceil(file.size / chunkSize),
      mode: 'start'
    })
  );
  const resData = await startRes.json()
  return resData;
}


export const multipartFileUploadS3UploadParts = async (file: File, progressCallback: Function, chunkSize: number, urls: Array<string>, uploadId: string) => {

  const lastIndex = urls.length - 1;
  // let putPromises: any[] = []

  async function putPromise(url: string, index: number) {
    const res = await fetch(
      url, {
      method: 'PUT', body:
        // Dissect file into chunks
        index !== lastIndex
          ? file.slice(index * chunkSize, (index + 1) * chunkSize)
          : file.slice(index * chunkSize),
    })
    progressCallback(Math.ceil(index / urls.length))
    return res
  }

  let putPromises = urls.map((url: any, index: any) => putPromise(url, index))

  console.log(putPromises);
  const uploadResults = await Promise.all(putPromises)
  console.log(uploadResults)
  const fileParts = uploadResults.map((element: any, index: any) =>
  ({
    ETag: element.headers.get('etag'),
    PartNumber: index + 1,
  }));
  console.log(fileParts)
  // Complete upload 
  const completeRes = await postData(
    'ml_models/multipart_file_upload/',
    JSON.stringify({
      filename: file.name,
      partsIds: fileParts,
      mode: 'complete',
      uploadId: uploadId,
    })
  );
  return completeRes
};


export async function abortMultiPartFileUpload(filename: string, uploadId: string) {
  let abortRes = await postData(
    'ml_models/multipart_file_upload/',
    JSON.stringify({
      filename: filename,
      uploadId: uploadId,
      mode: 'abort'
    })
  );
  return abortRes;
}