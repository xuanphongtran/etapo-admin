import React from 'react'
import CryptoJS from 'crypto-js'
import axios from 'axios'

const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/

const generateSHA1 = (data) => {
  const hash = CryptoJS.SHA1(data)
  return hash.toString(CryptoJS.enc.Hex)
}

const generateSignature = (publicId, apiSecret) => {
  const timestamp = new Date().getTime()
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
}

const getPublicIdFromUrl = (url) => {
  const match = url.match(regex)
  return match ? match[1] : null
}
export const DeleteImg = async (url) => {
  const publicId = getPublicIdFromUrl(url)
  const timestamp = new Date().getTime()
  const cloudName = import.meta.env.VITE_CLOUDINARY_NAME
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET
  const signature = generateSHA1(generateSignature(publicId, apiSecret))
  const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`

  try {
    const response = await axios.post(cloudUrl, {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    })
    return response
  } catch (error) {
    console.error(error)
  }
}
