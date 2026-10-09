export interface ClassProfile {
  className: string;
  totalStudents: number;
  maleCount: number;
  femaleCount: number;
  homeroomTeacher: string;
  academicYear: string;
  description: string;
  heroImage: string;
  classPhoto: string;
}

export interface Officer {
  id: string;
  name: string;
  role: string;
  description: string;
  photo: string;
}

export interface AlbumItem {
  id: string;
  title: string;
  category: 'Foto Bersama' | 'Kegiatan Kelas' | 'Study Tour' | 'Acara Sekolah' | 'Ulang Tahun' | 'Kenangan' | 'Lainnya';
  description: string;
  imageUrl: string;
  date: string;
}

export interface TaskItem {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  description: string;
  deadline: string;
  status: 'Belum dikerjakan' | 'Sedang dikerjakan' | 'Selesai' | 'Terlambat';
  link?: string;
  attachmentName?: string;
}

export interface CommentItem {
  id: string;
  name: string;
  comment: string;
  date: string;
  status: 'approved' | 'hidden';
}