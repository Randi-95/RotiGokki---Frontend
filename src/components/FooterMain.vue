<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
   <!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Footer Roti Gokki</title>
</head>

<body>
    <div class="content"></div>
    <footer>
        <div class="footer-container">
            <div class="footer-content">
                
                <div class="footer-section">
                    <h3 class="font-bold font-poppins">Roti Gokki</h3>
                    <div class="contact-info">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <p class="font-poppins">Sidoarjo, Pasuruan,<br>Malang, Surabaya,<br>Kediri</p>
                    </div>
                    <div class="contact-info">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <p class="font-poppins">+62 812-1727-5985</p>
                    </div>
                </div>

                <div class="footer-section">
                    <h3 class="font-bold font-poppins">Produk Kami</h3>
                    <ul>
                        <li><RouterLink to="/produk" class="font-poppins">Produk</RouterLink></li>
                        <li><RouterLink to="/kemitraan" class="font-poppins">Paket kemitraan</RouterLink></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3 class="font-bold font-poppins">Navigasi</h3>
                    <ul>
                        <li><RouterLink to="/" class="font-poppins">Beranda</RouterLink></li>
                        <li><RouterLink to="/produk" class="font-poppins">Produk</RouterLink></li>
                        <li><RouterLink to="/outlet" class="font-poppins">Outlet</RouterLink></li>
                        <li><RouterLink to="/kemitraan" class="font-poppins">Kemitraan</RouterLink></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3 class="font-bold font-poppins">Ikuti Kami</h3>
                    <a href="https://www.instagram.com/rotigokki?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" class="social-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </a>
                </div>
            </div>

            <div class="footer-divider"></div>

            <div class="footer-bottom">
                <p class="font-poppins">Copyright 2025 • RotiGokki, All Rights Reserved</p>
            </div>
        </div>
    </footer>
</body>
</html>
</template>

    <style scoped>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }



        .content {
            flex: 1;
        }

        .font-poppins {
            font-family: 'Poppins', sans-serif;
        }

        footer {
            background: linear-gradient(135deg, #1565C0 0%, #0D47A1 100%);
            color: white;
            padding: 50px 20px 20px;
        }

        .footer-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 0px;
            margin-bottom: 40px;
        }

        .footer-section h3 {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            color: white;
        }

        .font-bold {
            font-weight: 700;
        }

        .footer-section ul {
            list-style: none;
        }

        .footer-section ul li {
            margin-bottom: 12px;
        }

        .footer-section ul li a {
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            font-size: 15px;
            transition: all 0.3s ease;
            display: inline-block;
        }

        .footer-section ul li a:hover {
            color: white;
            transform: translateX(5px);
        }

        .contact-info {
            display: flex;
            align-items: flex-start;
            gap: 0px;
            margin-bottom: 20px;
        }

        .contact-info svg {
            flex-shrink: 0;
            margin-top: 3px;
        }

        .contact-info p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 15px;
            line-height: 1.6;
        }

        .social-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .social-icon:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: white;
            transform: translateY(-3px);
        }

        .footer-divider {
            height: 1px;
            background: rgba(255, 255, 255, 0.2);
            margin: 30px 0 20px;
        }

        .footer-bottom {
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
        }

        @media (max-width: 768px) {
            footer {
                padding: 40px 20px 20px;
            }

            .footer-content {
                grid-template-columns: 1fr;
                gap: 0px;
            }

            .footer-section h3 {
                font-size: 18px;
                margin-bottom: 15px;
            }

            .footer-section ul li {
                margin-bottom: 10px;
            }

            .contact-info {
                gap: 0px;
            }
        }

        @media (max-width: 480px) {
            footer {
                padding: 30px 15px 15px;
            }

            .footer-content {
                gap: 30px;
            }

            .footer-section h3 {
                font-size: 17px;
            }

            .footer-section ul li a {
                font-size: 14px;
            }

            .contact-info p {
                font-size: 14px;
            }

            .footer-bottom {
                font-size: 13px;
            }
        }
    </style>