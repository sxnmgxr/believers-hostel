module.exports = {
  khalti: {
    secretKey: process.env.KHALTI_SECRET_KEY,
    publicKey: process.env.KHALTI_PUBLIC_KEY,
    liveMode: process.env.KHALTI_LIVE_MODE === 'true',
    baseUrl: process.env.KHALTI_LIVE_MODE === 'true' 
      ? 'https://khalti.com/api/v2' 
      : 'https://dev.khalti.com/api/v2'
  },
  esewa: {
    secretKey: process.env.ESEWA_SECRET_KEY,
    merchantCode: process.env.ESEWA_MERCHANT_CODE,
    liveMode: process.env.ESEWA_LIVE_MODE === 'true',
    baseUrl: process.env.ESEWA_LIVE_MODE === 'true'
      ? 'https://esewa.com.np'
      : 'https://uat.esewa.com.np'
  },
  connectIps: {
    merchantId: process.env.CONNECT_IPS_MERCHANT_ID,
    merchantPassword: process.env.CONNECT_IPS_MERCHANT_PASSWORD,
    liveMode: process.env.CONNECT_IPS_LIVE_MODE === 'true'
  }
};