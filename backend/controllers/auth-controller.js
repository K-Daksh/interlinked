const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
//const TokenService = require('../services/token-service');
const tokenService = require('../services/token-service');
class AuthController{
    async sendOTP(req,res){
        const {phone}=req.body;
        if(!phone){
            res.status(400).json({message:"Phone Field is required"});
        }
        const otp = await otpService.generateOtp();
        const expireTimeOtp = 120000;
        const expires = Date.now()+expireTimeOtp;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);
        try{
            //await otpService.sendBySms(phone,otp);
            res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp,
            })
        }catch(error){
            console.log(error);
            res.status(500).json({message:`Error sending the message`});
        }
        //res.json({hash:hash});
        

    }
    async verifyOTP(req,res){
        //code here
        //const {otp,hash,phone}=req.body;
        const {otp,hash,phone}={
            "hash": "d6d6e7b1173d1e6cd0f4c2b1266de0a61d8d9b985a9dab325ec74bb6c650952b.1686147157093",
            "phone": "+919425494197",
            "otp": 4091
          };
        if(!otp || !hash || !phone){
            res.status(400).json({message:'All fields are required!'});
        }
        const [hashedOtp,expires]=hash.split('.');
        if(Date.now() > +expires){
            res.status(400).json({message:'OTP expired!'});
        }
        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp,data);
        if(!isValid){
            res.status(400).json({message:'Invalid OTP'});
        }


        let user;
        // let accessToken;
        // let refreshToken;

        try{
            user=await userService.findUser({phone});
            if(!user){
                await userService.createUser({phone});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({message:'Db error found!'});
        }

        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false,
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        //const userDto = new UserDto(user);
        res.json({accessToken});
    }
}
module.exports = new AuthController();
//singleton pattern 
//ie well always get the same object


// const otpService = require('../services/otp-service');
// const hashService = require('../services/hash-service');
// const userService = require('../services/user-service');
// const tokenService = require('../services/token-service');
// //const UserDto = require('../dtos/user-dto');

// class AuthController {
//     async sendOtp(req, res) {
//         const { phone } = req.body;
//         if (!phone) {
//             res.status(400).json({ message: 'Phone field is required!' });
//         }

//         const otp = await otpService.generateOtp();

//         const ttl = 1000 * 60 * 2; // 2 min
//         const expires = Date.now() + ttl;
//         const data = `${phone}.${otp}.${expires}`;
//         const hash = hashService.hashOtp(data);

//         // send OTP
//         try {
//             // await otpService.sendBySms(phone, otp);
//             res.json({
//                 hash: `${hash}.${expires}`,
//                 phone,
//                 otp,
//             });
//         } catch (err) {
//             console.log(err);
//             res.status(500).json({ message: 'message sending failed' });
//         }
//     }

//     async verifyOtp(req, res) {
//         const { otp, hash, phone } = req.body;
//         if (!otp || !hash || !phone) {
//             res.status(400).json({ message: 'All fields are required!' });
//         }

//         const [hashedOtp, expires] = hash.split('.');
//         if (Date.now() > +expires) {
//             res.status(400).json({ message: 'OTP expired!' });
//         }

//         const data = `${phone}.${otp}.${expires}`;
//         const isValid = otpService.verifyOtp(hashedOtp, data);
//         if (!isValid) {
//             res.status(400).json({ message: 'Invalid OTP' });
//         }

//         let user;
//         try {
//             user = await userService.findUser({ phone });
//             if (!user) {
//                 user = await userService.createUser({ phone });
//             }
//         } catch (err) {
//             console.log(err);
//             res.status(500).json({ message: 'Db error' });
//         }

//         const { accessToken, refreshToken } = tokenService.generateTokens({
//             _id: user._id,
//             activated: false,
//         });

//         res.cookie('refreshToken', refreshToken, {
//             maxAge: 1000 * 60 * 60 * 24 * 30,
//             httpOnly: true,
//         });
//         //const userDto = new UserDto(user);
//         res.json({ accessToken, user: userDto });
//     }
// }

// module.exports = new AuthController();