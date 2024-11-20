import db from "../db.js";

export const requestOtp = async (params) => {
  const { otp_code, unique_code, email, created_at } = params;
  return await db`INSERT INTO public.otp_request (otp_code, unique_code, user_id, created_at) 
  VALUES (${otp_code}, ${unique_code}, 
    (SELECT id FROM public.user WHERE email = ${email}), ${created_at}
  )`;
};

export const verifyOtp = async (params) => {
  const { otp_code, email } = params;
  const result = await db`
      SELECT otp_request.user_id, otp_request.created_at 
      FROM otp_request
      JOIN "user" ON otp_request.user_id = "user".id 
      WHERE otp_request.otp_code = ${otp_code} 
        AND "user".email = ${email} 
        AND otp_request.is_used = false
    `;

  return result;
};

export const updateOtpUsed = async (otp_code) => {
  return await db`
    UPDATE otp_request
    SET is_used = true
    WHERE otp_code = ${otp_code}
  `;
};
