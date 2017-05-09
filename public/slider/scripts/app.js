(function () {
  'use strict';

  window.X = function (response) {
    console.log(response);
//    <div class="carousel-item">
//            <div class="box">
//              <a href="http://www.pontofrio.com.br/tablets/Tablet/TabletAndroid/Tablet-DL-Everest-EV-T71-PRE-com-Tela-7”-4GB-Camera-2MP-Wi-Fi-Suporte-a-Modem-3G-e-Android-4-0-1768491.html" target="_blank">
//                <div class="image">
//                  <img src="http://imagens.pontofrio.com.br/Control/ArquivoExibir.aspx?IdArquivo=6665633" alt="">
//                </div>
//                <div class="info">
//                  <p class="name">Tablet Smart DL HD7 Kids K71 com 4GB, Wi-Fi, Tela 7", Câmera 2MP, Cabo USB, Suporte à Modem 3G, Slot para Cartão e Android 4.0 – Chumbo</p>
//                  <p class="old-price">De: <span>R$ 699,00</span></p>
//                  <p class="price">Por: <strong>R$ 499,00</strong></p>
//                  <p class="conditions">ou <strong>12X</strong> de <strong> 41.58</strong></p>
//                </div>
//              </a>
//            </div>
//          </div>


    response.data.recommendation.forEach(function (element, index) {
      var parentElement = document.querySelector('.carousel-container');
      var productItem = document.createElement('div');
      productItem.className = 'carousel-item';
      
      var productBox = document.createElement('div');
      productBox.className = 'box';

      productItem.appendChild(productBox);
      
      var productLink = document.createElement('a');
      productLink.setAttribute('target', '_blank');
      productLink.href = element.detailUrl;

      productBox.appendChild(productLink);
      
      var productImageBlock = document.createElement('div');
      productImageBlock.className = 'image';

      productLink.appendChild(productImageBlock);
      
      var productImage = document.createElement('img');
      productImage.src = element.imageName;

      productImageBlock.appendChild(productImage);
      
      var productInfo = document.createElement('div');
      productInfo.className = 'info';
      
      var productName = document.createElement('p');
      productName.className = 'name';
      productName.innerHTML = element.name;
      productInfo.appendChild(productName);
      
      if(element.oldPrice){
        var productOldPrice = document.createElement('p');
        productOldPrice.className = 'old-price';
        productOldPrice.innerHTML = 'De: <span>'+element.oldPrice+'</span>';
        productInfo.appendChild(productOldPrice);
      }
      
      var productPrice = document.createElement('p');
      productPrice.className = 'price';
      productPrice.innerHTML = 'Por: <strong>'+element.price+'</strong>';
      productInfo.appendChild(productPrice);
      
      if(element.productInfo.paymentConditions){
        var productConditions = document.createElement('p');
        productConditions.className = 'conditions';
        productConditions.innerHTML = element.productInfo.paymentConditions;
        productInfo.appendChild(productConditions);
      }
      
      productLink.appendChild(productInfo);
      
      parentElement.appendChild(productItem);
    });

    var carousel = new Carousel('.carousel-container', {steps: 3});
    carousel.init();
  };

})();


