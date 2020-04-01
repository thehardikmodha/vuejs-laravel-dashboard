import axios from 'axios';
import {getToken} from "./auth";
// import Swal from 'sweetalert2';
import NProgress from 'nprogress';
// import { loadProgressBar } from 'axios-progress-bar';
NProgress.configure({});
NProgress.start();

let API_BASE_URL = document.head.querySelector('meta[name="API_BASE_URL"]');
if (!API_BASE_URL) {
    // console.error('Api Base URL not found');
}

// Create axios instance
const service = axios.create({
    baseURL: API_BASE_URL.content + '/api',
    timeout: 10000, // Request timeout
    onUploadProgress: () => {
        NProgress.inc();
    },
    onDownloadProgress: () => {
        NProgress.inc();
    }
});

// Request intercepter
service.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + getToken(); // Set JWT token
        }

        return config;
    },
    error => {
        // Do something with request error
        // console.log(error); // for debug
        Promise.reject(error);
    },
);

service.interceptors.response.use(response => {
    NProgress.done();
    return response
});

// // response pre-processing
// service.interceptors.response.use(
//   error => {
//       Swal.mixin({
//           toast: true,
//           position: 'top-end',
//           showConfirmButton: false,
//           timer: 5000,
//           timerProgressBar: true,
//           onOpen: (toast) => {
//               toast.addEventListener('mouseenter', Swal.stopTimer),
//               toast.addEventListener('mouseleave', Swal.resumeTimer)
//           }
//       }).fire({
//           icon: 'error',
//           title: error.message ? error.message : 'There was an error please try after some time.'
//       });
//     return Promise.reject(error);
//   },
// );

export default service;
