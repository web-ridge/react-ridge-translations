"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTranslations = void 0;
const R = require("react");
function createTranslations() {
    return function (t, po) {
        let sb = [];
        let o = po;
        let et = {};
        function gen() {
            Object.keys(t).forEach(g => {
                et[g] = {};
                Object.keys(t[g]).forEach(k => {
                    let tv = t[g][k];
                    et[g][k] = tv instanceof Function ? (...p) => {
                        let z = tv(...p);
                        return z[o.language] || z[o.fallback];
                    } : tv[o.language] || tv[o.fallback];
                });
            });
        }
        function setOptions(op) {
            o = op;
            gen();
            sb.forEach((c) => c((p) => p + 1));
        }
        function subscribe() {
            let [, s] = R.useState(0);
            R.useEffect(() => {
                sb.push(s);
                return () => {
                    sb = sb.filter((f) => f !== s);
                };
            }, [s]);
        }
        function use() {
            subscribe();
            return et;
        }
        function useOptions() {
            subscribe();
            return o;
        }
        gen();
        return {
            translations: et,
            getOptions: () => o,
            setOptions,
            useOptions,
            use,
        };
    };
}
exports.createTranslations = createTranslations;
