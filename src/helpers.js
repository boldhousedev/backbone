import { base64encode, base64decode } from "nodejs-base64";

var helpers = { model_prototype: {} };

helpers.model_prototype.getId = function () {
    return this.get(this.idAttribute);
};

helpers.model_prototype.setId = function (v) {
    return this.set(this.idAttribute, v);
};

helpers.model_prototype.titleAttribute = "title";
helpers.model_prototype.titleJoinText = " - ";
helpers.model_prototype.getTitle = function () {
    var fields = this.titleAttribute.split("+"),
        title = [];

    for (let field of fields) {
        title.push(this.get(field));
    }

    return title.join(this.titleJoinText);
};

helpers.model_prototype.getEncoded = function (a) {
    return base64encode(this.get(a));
};

helpers.model_prototype.getDecoded = function (a) {
    return base64decode(this.get(a));
};

helpers.model_prototype.setEncoded = function (a, v) {
    return this.set(a, base64encode(v));
};

helpers.model_prototype.setDecoded = function (a, v) {
    return this.set(a, base64decode(v));
};

export default helpers;
