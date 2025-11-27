import { IsNotEmpty, IsString } from "class-validator";
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    email : string
    @IsNotEmpty({message : "le nom est obligatoire"})
    @IsString()
    name : string 
    @IsString()
    @IsNotEmpty({message : "le mot de passe est obligatoire"})
    password:string
}
