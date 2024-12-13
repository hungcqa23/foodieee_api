import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';

const CLOUDINARY = 'CLOUDINARY';
// const configService = new ConfigService();

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (configService: ConfigService) => {
    return v2.config({
      cloud_name: configService.get('CLOUDINARY_NAME'),
      api_key: configService.get('CLOUDINARY_API_KEY'),
      api_secret: configService.get('CLOUDINARY_API_SECRET')
    });
  },
  inject: [ConfigService]
};
