type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type Group = {
  id: string;
  name: string;
  permission: Array<Permission>;
}