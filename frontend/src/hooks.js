// /** @type {import('@sveltejs/kit').Handle} */
// export async function handle({ event, resolve }) {
//     const response = await resolve(event);
//     response.headers.append('set-cookie', event.locals.jwt);
//     return response;
// }
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const response = await resolve(event);
    response.headers.append('set-cookie', event.locals.jwt);
    return response;
}