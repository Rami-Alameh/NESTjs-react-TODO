import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { userEntity } from "src/Entity/user.entity";
import { Repository } from "typeorm";

//uses passport to extract a jwt for a user using their email and checks if authorization is completee
    export class JwtCustomStrategy extends PassportStrategy(Strategy) {
        constructor(@InjectRepository(userEntity) private repo: Repository<userEntity>) {
          super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'todosecret'
          });
        }
        async validate(payload:{email:string}){
            const {email}=payload;
            const user= await this.repo.findOneBy({email});
            if(!user){
                throw new UnauthorizedException("unathorized token");
            }
            return user;
        }
}