import _ from "underscore-bd";
import CryptoJS from "crypto-js";

export default function (v, f, m, o = {}) {
    var fv,
        defaults = { style: "currency", currency: "BRL", lang: "pt-BR" };
    switch (typeof f) {
        case "function":
            fv = f(v, m);
            break;
        case "object":
            v && (fv = v.replace(f[!m ? 0 : 2], f[!m ? 1 : 3]));
            break;
        default:
            if (typeof v !== "undefined" && v !== null) {
                v = !_.isObject(v) ? v + "" : v;
                var fa = f ? f.split(",") : f,
                    fa0 = fa ? fa[0] : fa;
                switch (fa0) {
                    case "json":
                        try {
                            fv = !m ? JSON.parse(v) : JSON.stringify(v);
                        } catch (e) {
                            fv = !m ? JSON.parse("null") : JSON.stringify(null);
                        }
                        break;
                    case "array":
                        fv = _.isArray(v) ? v : _.isJSON(v) ? _.toArray(v) : v;
                        break;
                    case "objectArray": // used to convert a json indexed object to server as an array and the opp
                        if (!m) {
                            if (!_.isArray(v)) fv = v;
                            else if (fa.length === 1) fv = _.toObject(v);
                            else fv = _.indexBy(v, fa[1]);
                        } else {
                            fv = !_.isJSON(v) ? v : _.toArray(v);
                        }
                        break;
                    case "sendAsArray": // used to convert a json indexed object to server as an array
                        if (!m) {
                            fv = v;
                        } else {
                            fv = !_.isJSON(v) ? v : _.toArray(v);
                        }
                        break;
                    case "receiveAsObject": // used to convert a server array to object
                        if (!m) {
                            fv = !_.isArray(v) ? v : _.toObject(v);
                        } else {
                            fv = v;
                        }
                        break;
                    case "date":
                        fv = !m
                            ? v.replace(/(\d{4})\-(\d{2})\-(\d{2})/, "$3/$2/$1")
                            : v.replace(
                                /(\d{2})\/(\d{2})\/(\d{4})/,
                                "$3-$2-$1"
                            );
                        break;
                    case "decimal":
                        fv = !m
                            ? v.replace(/\,/g, "").replace(/\./g, ",")
                            : v.replace(/\./g, "").replace(/\,/g, ".");
                        break;
                    case "money":
                        o = _.defaults(o, defaults);
                        fv = !m
                            ? new Intl.NumberFormat(o.lang, o).format(v)
                            : v
                                .replace(/\./g, "")
                                .replace(/\,/g, ".")
                                .replace(/[^0-9\.\,]/g, "");
                        break;
                    case "moneynumber":
                        o = _.defaults(o, defaults);
                        fv = !m
                            ? new Intl.NumberFormat(o.lang, o)
                                .format(v)
                                .replace(/[^0-9\.\,]/g, "")
                            : v
                                .replace(/\./g, "")
                                .replace(/\,/g, ".")
                                .replace(/[^0-9\.\,]/g, "");
                        break;
                    case "float":
                        o = _.defaults(o, defaults);
                        fv = !m
                            ? new Intl.NumberFormat(o.lang, o)
                                .format(v)
                                .replace(/[^0-9\.\,]/g, "")
                            : parseFloat(
                                v
                                    .replace(/\./g, "")
                                    .replace(/\,/g, ".")
                                    .replace(/[^0-9\.\,]/g, "")
                            );
                        break;
                    case "integer":
                        fv = parseInt(
                            v
                                .replace(/\./g, "")
                                .replace(/\,/g, "")
                                .replace(/\D/g, ""),
                            10
                        );
                        break;
                    case "lowercase":
                        fv = v.toLowerCase();
                        break;
                    case "uppercase":
                        fv = v.toUpperCase();
                        break;
                    case "md5transfer":
                        fv = !m ? v : CryptoJS.MD5(v).toString();
                        break;
                    case "sha256transfer":
                        fv = !m ? v : CryptoJS.SHA256(v).toString();
                        break;
                    case "intstr":
                        fv = v
                            .replace(/\./g, "")
                            .replace(/\,/g, "")
                            .replace(/\D/g, "");
                        break;
                }
            }
            break;
    }

    return fv;
}
