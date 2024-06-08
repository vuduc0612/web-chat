import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';

import { AuthDto } from './dto/auth.dto';
import { Public } from './decorator/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signUp(dto);
    }

    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signIn(dto);
    }

    @Get('confirm/:confirmationCode')
    confirmAccount(@Param('confirmationCode') confirmationCode: string) {
        return this.authService.confirmAccount(confirmationCode);
    }
}
