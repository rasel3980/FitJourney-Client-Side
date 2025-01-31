import useAxiosSecure from "../Hooks/useAxiosSecure"


export const imageUpload = async imageData => {
    const axiosSecure = useAxiosSecure();
  const formData = new FormData()
  formData.append('image', imageData)
  const { data } = await axiosSecure.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
    formData
  )
  return data.data.display_url
}