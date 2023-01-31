
export class User {
    id: string;
    email: string;
    name: string;
    profileImage: string;

    constructor(id: string, email: string, name: string, profileImage: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.profileImage = profileImage;
    }


    updateModel({
        id = this.id,
        email = this.email,
        name = this.name,
        profileImage = this.profileImage,
    }) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.profileImage = profileImage;
    }

    toJson(){
        return JSON.stringify({
            id:this.id,
            email:this.email,
            name:this.name,
            profileImage:this.profileImage,
        })
    }

    static fromJson(jsonString:string){
        var json = JSON.parse(jsonString)
        return new User(
            json['id'],
            json['email'],
            json['name'],
            json['profileImage'],
        )
    }
}