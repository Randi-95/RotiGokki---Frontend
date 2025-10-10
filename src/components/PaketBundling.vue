<template>
    <div class="w-full h-screen flex">
        <!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Special Bundling GOBOX</title>
</head>
<body>
    <div class="container">
        <div class="left-content">
            <h1 class="title font-fredokaone">Spesial Bundling<br>GOBOX Untukmu!</h1>
            <p class="subtitle font-poppins">Rasakan kelezatan roti berkualitas premium<br>dengan harga yang tetap bersahabat.</p>
            
            <div class="features">
                <div class="feature-item">
                    <div class="checkmark"></div>
                    <span class="feature-text font-fredokaone">Lebih Hemat!</span>
                </div>
                <div class="feature-item">
                    <div class="checkmark"></div>
                    <span class="feature-text font-fredokaone">Lebih Kenyang!</span>
                </div>
                <div class="feature-item">
                    <div class="checkmark"></div>
                    <span class="feature-text font-fredokaone">Lebih Puas!</span>
                </div>
            </div>
            
            <button class="cta-button font-bold border border-transparent rounded-sm font-poppins">Pesan Sekarang</button>
        </div>
        
        <div class="right-content">
            <img src="/public/grup47.png" alt="Paket Bundling GOBOX" class="product-image">
        </div>
    </div>
</body>
</html>
    </div>
</template>

<style scoped>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'fredokaone', sans-serif;
            background: #f5f5f5;
            padding: 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 60px;
            display: flex;
            align-items: center;
            gap: 80px;
        }

        .left-content {
            flex: 1;
            max-width: 600px;
        }

        .title {
            font-size: 56px;
            font-weight: 900;
            color: #1e5a96;
            line-height: 1.2;
            margin-bottom: 30px;
        }

        .subtitle {
            font-size: 18px;
            color: #333;
            margin-bottom: 40px;
            line-height: 1.6;
        }

        .features {
            margin-bottom: 50px;
        }

        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }

        .checkmark {
            width: 35px;
            height: 35px;
            background-color: white;
            border: 3px solid #333;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            font-size: 1.2rem;
            flex-shrink: 0;
        }

        .checkmark::after {
            content: '✓';
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }

        .feature-text {
            font-size: 28px;
            font-weight: 900;
            color: #333;
        }

        .cta-button {
            background: #1e5a96;
            color: white;
            font-size: 24px;
            font-weight: 900;
            padding: 20px 60px;
            border: none;
            border-radius: 15px;
            cursor: pointer;
            width: 100%;
            max-width: 400px;
            transition: background 0.3s ease;
        }

        .cta-button:hover {
            background: #164570;
        }

        .right-content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .product-image {
            width: 100%;
            max-width: 500px;
            height: auto;
            border-radius: 20px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        @media (max-width: 1024px) {
            .container {
                padding: 40px;
                gap: 50px;
            }

            .title {
                font-size: 48px;
            }

            .feature-text {
                font-size: 24px;
            }

            .cta-button {
                font-size: 20px;
                padding: 18px 50px;
            }
        }

        @media (max-width: 768px) {
            .container {
                flex-direction: column;
                padding: 30px;
                gap: 40px;
            }

            .left-content {
                max-width: 100%;
            }

            .title {
                font-size: 40px;
            }

            .subtitle {
                font-size: 16px;
            }

            .feature-text {
                font-size: 22px;
            }

            .checkmark {
                width: 30px;
                height: 30px;
            }

            .checkmark::after {
                font-size: 20px;
            }

            .cta-button {
                max-width: 100%;
                font-size: 20px;
            }

            .right-content {
                width: 100%;
            }

            .product-image {
                max-width: 60%;
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 20px;
                gap: 30px;
            }

            .title {
                font-size: 32px;
            }

            .subtitle {
                font-size: 14px;
                margin-bottom: 30px;
            }

            .features {
                margin-bottom: 40px;
            }

            .feature-item {
                margin-bottom: 15px;
            }

            .feature-text {
                font-size: 20px;
            }

            .checkmark {
                width: 28px;
                height: 28px;
                margin-right: 15px;
            }

            .cta-button {
                font-size: 18px;
                padding: 16px 40px;
            }
        }

</style >