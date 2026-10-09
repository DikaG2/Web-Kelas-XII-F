import { ClassProfile, Officer, AlbumItem, TaskItem, CommentItem } from '../types';

export const initialProfile: ClassProfile = {
  className: "XII-F",
  totalStudents: 35,
  maleCount: 23,
  femaleCount: 12,
  homeroomTeacher: "Drs. Budi Santoso, M.Pd.",
  academicYear: "2025 / 2026",
  description: "XII-F adalah sebuah keluarga kecil yang terdiri dari 35 siswa dengan berbagai karakter, cerita, dan pengalaman. Website ini menjadi ruang digital untuk menyimpan kenangan, berbagi informasi, dan mendokumentasikan perjalanan kami.",
  heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",
  classPhoto: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
};

export const initialOfficers: Officer[] = [
  { id: '1', name: 'Ahmad Fauzi', role: 'Ketua Kelas', description: 'Bertanggung jawab atas kedisiplinan dan koordinasi kelas.', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop' },
  { id: '2', name: 'Siti Rahma', role: 'Wakil Ketua', description: 'Membantu ketua kelas dan mengkoordinasikan kegiatan.', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop' }
];

export const initialAlbums: AlbumItem[] = [
  { id: '1', title: 'Foto Bersama Angkatan XII-F', category: 'Foto Bersama', description: 'Momen kebersamaan di depan sekolah.', imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop', date: '2026-01-15' }
];

export const initialTasks: TaskItem[] = [
  { id: '1', title: 'Laporan Praktikum Fisika TKA', subject: 'Fisika', teacher: 'Pak Joko', description: 'Membuat laporan lengkap uji coba hukum ohm.', deadline: '2026-10-15', status: 'Belum dikerjakan', link: '#' }
];

export const initialComments: CommentItem[] = [
  { id: '1', name: 'Andi Nugroho', comment: 'XII-F paling kompak dan solid pokoknya!', date: '2026-10-01 10:30', status: 'approved' }
];