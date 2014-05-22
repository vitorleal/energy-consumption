angular.module("light.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("credit.html","<section class=\"app-section\">\n  <div class=\"app-user-area\" data-ng-include=\"\'include/balance.html\'\"></div>\n\n  <div class=\"app-content\">\n    <h4>Quanto deseja recarregar:</h4>\n\n    <div class=\"row credit-area\">\n      <div class=\"col-xs-6\">\n        <label data-ng-class=\"{ \'credit-selected\': credit == 5 }\" class=\"credit-btn btn btn-lg btn-block btn-default\">\n          R$ 5\n          <input class=\"credit-radio\" type=\"radio\" data-ng-model=\"credit\" value=\"5\">\n        </label>\n      </div>\n      <div class=\"col-xs-6\">\n        <label data-ng-class=\"{ \'credit-selected\': credit == 10 }\" class=\"credit-btn btn btn-lg btn-block btn-default\">\n          R$ 10\n          <input class=\"credit-radio\" type=\"radio\" data-ng-model=\"credit\" value=\"10\">\n        </label>\n      </div>\n      <div class=\"col-xs-6\">\n        <label data-ng-class=\"{ \'credit-selected\': credit == 20 }\" class=\"credit-btn btn btn-lg btn-block btn-default\">\n          R$ 20\n          <input class=\"credit-radio\" type=\"radio\" data-ng-model=\"credit\" value=\"20\">\n        </label>\n      </div>\n      <div class=\"col-xs-6\">\n        <label data-ng-class=\"{ \'credit-selected\': credit == 50 }\" class=\"credit-btn btn btn-lg btn-block btn-default\">\n          R$ 50\n          <input class=\"credit-radio\" type=\"radio\" data-ng-model=\"credit\" value=\"50\">\n        </label>\n      </div>\n    </div>\n\n    <div class=\"credit-buttons\">\n      <button data-ng-click=\"buy()\"    class=\"btn btn-lg btn-block btn-success\">Comprar</button>\n      <button data-ng-click=\"goBack()\" class=\"btn btn-lg btn-block btn-default\">Cancelar</button>\n    </div>\n  </div>\n</section>\n");
$templateCache.put("dashboard.html","<section class=\"app-section\">\n  <div class=\"app-user-area\" data-ng-include=\"\'include/balance.html\'\"></div>\n\n  <div class=\"app-content\">\n    <h4 data-ng-show=\"history\">Histórico dos últimos 10 dias:</h4>\n    <bar id=\"chart\" data-graph=\"graph\"></bar>\n\n    <div ng-hide=\"{{ user.kwh == 20 }}\" class=\"panel panel-warning\">\n      <div class=\"panel-heading\">\n        <h3 class=\"panel-title text-center\">kWh consumidos este mês</h3>\n      </div>\n      <div class=\"panel-body text-center\"><strong>{{ user.kwh }}</strong>kWh</div>\n    </div>\n\n    <table data-ng-show=\"history\" class=\"table table-striped table-bordered\">\n      <thead>\n        <tr>\n          <th class=\"text-center\">#</th>\n          <th class=\"text-center\">kWh</th>\n          <th class=\"text-center\">Preço</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr data-ng-repeat=\"h in history\">\n          <td class=\"text-center\">dia {{ $index + 1 }}</td>\n          <td class=\"text-center\"><strong>{{ h.consumed }}</strong>kWh</td>\n          <td class=\"text-center\">R$ <strong>{{ h.price }}</strong></td>\n        </tr>\n      </tbody>\n    </table>\n\n    <div class=\"credit-buttons\">\n      <button data-ng-click=\"goToCredit()\" class=\"btn btn-block btn-lg btn-success\">Adicionar crédito</button>\n      <button ng-show=\"user.balance > 0\" data-ng-click=\"goToDebit()\"  class=\"btn btn-block btn-lg btn-default\">Debitar usuário</button>\n    </div>\n  </div>\n</section>\n");
$templateCache.put("debit.html","<section class=\"app-section\">\n  <div class=\"app-user-area\" data-ng-include=\"\'include/balance.html\'\"></div>\n\n  <div class=\"app-content\">\n    <div class=\"credit-buttons\">\n      <button data-ng-click=\"debit()\"  class=\"btn btn-lg btn-block btn-yellow\">Debitar diaria</button>\n      <button data-ng-click=\"goBack()\" class=\"btn btn-lg btn-block btn-default\">Cancelar</button>\n    </div>\n    <div class=\"credit-buttons\">\n      <button data-ng-click=\"reset()\"  class=\"btn btn-lg btn-block btn-danger\">Limpar histórico</button>\n    </div>\n  </div>\n</section>\n");
$templateCache.put("login.html","<form class=\"login-area\" data-ng-submit=\"login()\">\n  <div class=\"form-group\">\n    <label for=\"email\">Email</label>\n    <input type=\"email\" data-ng-model=\"email\" class=\"input-lg form-control\" id=\"email\" placeholder=\"Digite seu email\">\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"pass\">Senha</label>\n    <input type=\"password\" data-ng-model=\"pass\" class=\"input-lg form-control\" id=\"pass\" placeholder=\"Digite sua senha\">\n  </div>\n\n  <button type=\"submit\" class=\"btn btn-lg btn-block btn-yellow\">Entrar</button>\n</form>\n");
$templateCache.put("include/balance.html","<div class=\"user-balance text-center\">\n  Seu saldo é R$ <strong>{{ user.balance }}</strong>\n</div>\n");
$templateCache.put("include/credit-card.html","<h4>Selecione seu cartão</h4>\n\n<select data-ng-module=\"card\" class=\"form-control input-lg card-select\">\n  <option value=\"xxxx-xxxx-xxxx-8979\" selected>xxxx-xxxx-xxxx-8979</option>\n  <option value=\"xxxx-xxxx-xxxx-5492\">xxxx-xxxx-xxxx-5492</option>\n</select>\n<p class=\"text-right\">Pague com <img src=\"img/zuum.png\"></p>\n\n<div class=\"credit-buttons\">\n  <button data-ng-click=\"buy()\"     class=\"btn btn-lg btn-block btn-success\">Finalizar compra</button>\n  <button data-ng-click=\"goBack()\"  class=\"btn btn-lg btn-block btn-default\">Cancelar</button>\n</div>\n");
$templateCache.put("include/error.html","<h4 class=\"text-center\">{{ error }}</h4>\n");
$templateCache.put("include/header.html","<a href=\"#dashboard\" class=\"logo\">Light</a>\n");}]);