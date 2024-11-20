import db from "../db.js";

export const getAllUser = async () => {
  return await db`SELECT * FROM public.user`;
};

export const getUserByEmail = async (email) => {
  return await db`SELECT * FROM public.user WHERE email=${email}`;
};

export const CreateUser = async (params) => {
  const { username, email, password, phone, photo } = params;
  if (!photo) {
    return await db`INSERT INTO public.user(username,email,password,phone) VALUES (${username},${email},${password},${phone})`;
  } else {
    return await db`INSERT INTO public.user(username,email,password,phone,photo) VALUES (${username},${email},${password},${phone},${photo})`;
  }
};

export const checkUserActive = async (user_id) => {
  const result =
    await db`SELECT public.user.is_active FROM public.user WHERE id=${user_id}`;
  return result[0]?.is_active ?? false;
};

export const UpdateUserActive = async (user_id) => {
  return await db`
    UPDATE public.user
    SET is_active = true
    WHERE id = ${user_id}
  `;
};
