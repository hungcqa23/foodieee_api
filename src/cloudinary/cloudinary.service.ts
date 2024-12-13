import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  constructor() {}
  uploadFile(file: any): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
