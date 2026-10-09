import { ClassProfile, Officer, AlbumItem, TaskItem, CommentItem } from '../types';
import { initialProfile, initialOfficers, initialAlbums, initialTasks, initialComments } from '../data/initialData';

export const getProfile = (): ClassProfile => {
  const data = localStorage.getItem('xii_f_profile');
  return data ? JSON.parse(data) : initialProfile;
};
export const saveProfile = (profile: ClassProfile) => {
  localStorage.setItem('xii_f_profile', JSON.stringify(profile));
};

export const getOfficers = (): Officer[] => {
  const data = localStorage.getItem('xii_f_officers');
  return data ? JSON.parse(data) : initialOfficers;
};
export const saveOfficers = (officers: Officer[]) => {
  localStorage.setItem('xii_f_officers', JSON.stringify(officers));
};

export const getAlbums = (): AlbumItem[] => {
  const data = localStorage.getItem('xii_f_albums');
  return data ? JSON.parse(data) : initialAlbums;
};
export const saveAlbums = (albums: AlbumItem[]) => {
  localStorage.setItem('xii_f_albums', JSON.stringify(albums));
};

export const getTasks = (): TaskItem[] => {
  const data = localStorage.getItem('xii_f_tasks');
  return data ? JSON.parse(data) : initialTasks;
};
export const saveTasks = (tasks: TaskItem[]) => {
  localStorage.setItem('xii_f_tasks', JSON.stringify(tasks));
};

export const getComments = (): CommentItem[] => {
  const data = localStorage.getItem('xii_f_comments');
  return data ? JSON.parse(data) : initialComments;
};
export const saveComments = (comments: CommentItem[]) => {
  localStorage.setItem('xii_f_comments', JSON.stringify(comments));
};
// --- TAMBAHAN UNTUK DATA JADWAL & JAM PELAJARAN ---
export const getSchedule = () => {
  const data = localStorage.getItem('class_schedule');
  
  const defaultTimeSlots = {
    senin: [],
    selasa_kamis: [],
    jumat: []
  };

  if (data) {
    const parsed = JSON.parse(data);
    // Mencegah error jika sebelumnya pakai versi lama (yang belum dipisah harinya)
    if (Array.isArray(parsed.timeSlots)) {
      parsed.timeSlots = {
        senin: parsed.timeSlots,
        selasa_kamis: parsed.timeSlots,
        jumat: parsed.timeSlots
      };
    }
    return parsed;
  }
  
  // Data default jika belum ada yang diatur
  return {
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop',
    timeSlots: defaultTimeSlots
  };
};

export const saveSchedule = (data: any) => {
  localStorage.setItem('class_schedule', JSON.stringify(data));
};