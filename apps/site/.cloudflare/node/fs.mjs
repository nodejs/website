import { files } from '../../.generated/next.helpers.mjs';

export function readdir(params, cb) {
  console.log('fs#readdir', params);
  cb(null, []);
}

export function exists(path, cb) {
  const result =
    files.includes(path) || files.includes(path.replace(/^\//, ''));
  console.log('fs#exists', path, result);
  cb(result);
}

export default {
  readdir,
  exists,
};
