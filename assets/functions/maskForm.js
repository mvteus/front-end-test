(function( $ ) {
    $(function() {
  
      var phoneMask = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
      },
      options = {
        onKeyPress: function(val, e, field, options) {
            field.mask(phoneMask.apply({}, arguments), options);
          }
      };
  
      $('input[name="phone"]').mask(phoneMask, options);
      $('input[name="cardPhone"]').mask(phoneMask, options);
  
    });
    $('input[name="postalCode"]').blur(function(){
                  // Remove tudo o que não é número para fazer a pesquisa
                  var cep = this.value.replace(/[^0-9]/, "");
                  if(cep.length != 8){
                      return false;
                  }
                  var url = "https://viacep.com.br/ws/"+cep+"/json/";
                  $.getJSON(url, function(dadosRetorno){
                      try{
                          $('input[name="address"]').val(dadosRetorno.logradouro);
                          $('input[name="district"]').val(dadosRetorno.bairro);
                          $('input[name="city"]').val(dadosRetorno.localidade);
                          $('input[name="state"]').val(dadosRetorno.uf);
                      }catch(ex){}
                  });
              });
  })(jQuery);
