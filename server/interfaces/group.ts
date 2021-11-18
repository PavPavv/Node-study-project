type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

type Group = {
  id: string;
  name: string;
  permission: Array<Permission>;
}