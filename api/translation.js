/**
 * @author William DURAND <william.durand1@gmail.com>
 * @license MIT Licensed
 */
 ! function(e, a) {
    "function" == typeof define && define.amd ? define("Translator", a) : "object" == typeof module && module.exports ? module.exports = a() : e.Translator = a()
}(this, function() {
    "use strict";

    function e(e, a) {
        var s, n = p.placeHolderPrefix,
            c = p.placeHolderSuffix;
        for (s in a) {
            var r = new RegExp(n + s + c, "g");
            if (r.test(e)) {
                var t = String(a[s]).replace(new RegExp("\\$", "g"), "$$$$");
                e = e.replace(r, t)
            }
        }
        return e
    }

    function a(e, a, n, c, r) {
        var t = n || c || r,
            i = a,
            u = t.split("_")[0];
        if (!(t in l))
            if (u in l) t = u;
            else {
                if (!(r in l)) return e;
                t = r
            } if (void 0 === i || null === i)
            for (var o = 0; o < f.length; o++)
                if (s(t, f[o], e) || s(u, f[o], e) || s(r, f[o], e)) {
                    i = f[o];
                    break
                } if (s(t, i, e)) return l[t][i][e];
        for (var h, d, p, m; t.length > 2 && (h = t.length, d = t.split(/[\s_]+/), p = d[d.length - 1], m = p.length, 1 !== d.length);)
            if (t = t.substring(0, h - (m + 1)), s(t, i, e)) return l[t][i][e];
        return s(r, i, e) ? l[r][i][e] : e
    }

    function s(e, a, s) {
        return e in l && (a in l[e] && s in l[e][a])
    }

    function n(e, a, s) {
        var n, t, i = [],
            l = [],
            u = e.split(p.pluralSeparator),
            f = [];
        for (n = 0; n < u.length; n++) {
            var m = u[n];
            h.test(m) ? (f = m.match(h), i[f[0]] = f[f.length - 1]) : o.test(m) ? (f = m.match(o), l.push(f[1])) : l.push(m)
        }
        for (t in i)
            if (d.test(t))
                if (f = t.match(d), f[1]) {
                    var g, v = f[2].split(",");
                    for (g in v)
                        if (a == v[g]) return i[t]
                } else {
                    var b = c(f[4]),
                        k = c(f[5]);
                    if (("[" === f[3] ? a >= b : a > b) && ("]" === f[6] ? a <= k : a < k)) return i[t]
                } return l[r(a, s)] || l[0] || void 0
    }

    function c(e) {
        return "-Inf" === e ? Number.NEGATIVE_INFINITY : "+Inf" === e || "Inf" === e ? Number.POSITIVE_INFINITY : parseInt(e, 10)
    }

    function r(e, a) {
        var s = a;
        switch ("pt_BR" === s && (s = "xbr"), s.length > 3 && (s = s.split("_")[0]), s) {
            case "bo":
            case "dz":
            case "id":
            case "ja":
            case "jv":
            case "ka":
            case "km":
            case "kn":
            case "ko":
            case "ms":
            case "th":
            case "tr":
            case "vi":
            case "zh":
                return 0;
            case "af":
            case "az":
            case "bn":
            case "bg":
            case "ca":
            case "da":
            case "de":
            case "el":
            case "en":
            case "eo":
            case "es":
            case "et":
            case "eu":
            case "fa":
            case "fi":
            case "fo":
            case "fur":
            case "fy":
            case "gl":
            case "gu":
            case "ha":
            case "he":
            case "hu":
            case "is":
            case "it":
            case "ku":
            case "lb":
            case "ml":
            case "mn":
            case "mr":
            case "nah":
            case "nb":
            case "ne":
            case "nl":
            case "nn":
            case "no":
            case "om":
            case "or":
            case "pa":
            case "pap":
            case "ps":
            case "pt":
            case "so":
            case "sq":
            case "sv":
            case "sw":
            case "ta":
            case "te":
            case "tk":
            case "ur":
            case "zu":
                return 1 == e ? 0 : 1;
            case "am":
            case "bh":
            case "fil":
            case "fr":
            case "gun":
            case "hi":
            case "ln":
            case "mg":
            case "nso":
            case "xbr":
            case "ti":
            case "wa":
                return 0 === e || 1 == e ? 0 : 1;
            case "be":
            case "bs":
            case "hr":
            case "ru":
            case "sr":
            case "uk":
                return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
            case "cs":
            case "sk":
                return 1 == e ? 0 : e >= 2 && e <= 4 ? 1 : 2;
            case "ga":
                return 1 == e ? 0 : 2 == e ? 1 : 2;
            case "lt":
                return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
            case "sl":
                return e % 100 == 1 ? 0 : e % 100 == 2 ? 1 : e % 100 == 3 || e % 100 == 4 ? 2 : 3;
            case "mk":
                return e % 10 == 1 ? 0 : 1;
            case "mt":
                return 1 == e ? 0 : 0 === e || e % 100 > 1 && e % 100 < 11 ? 1 : e % 100 > 10 && e % 100 < 20 ? 2 : 3;
            case "lv":
                return 0 === e ? 0 : e % 10 == 1 && e % 100 != 11 ? 1 : 2;
            case "pl":
                return 1 == e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 12 || e % 100 > 14) ? 1 : 2;
            case "cy":
                return 1 == e ? 0 : 2 == e ? 1 : 8 == e || 11 == e ? 2 : 3;
            case "ro":
                return 1 == e ? 0 : 0 === e || e % 100 > 0 && e % 100 < 20 ? 1 : 2;
            case "ar":
                return 0 === e ? 0 : 1 == e ? 1 : 2 == e ? 2 : e >= 3 && e <= 10 ? 3 : e >= 11 && e <= 99 ? 4 : 5;
            default:
                return 0
        }
    }

    function t(e, a) {
        for (var s = 0; s < e.length; s++)
            if (a === e[s]) return !0;
        return !1
    }

    function i() {
        return "undefined" != typeof document ? document.documentElement.lang.replace("-", "_") : u
    }
    var l = {},
        u = "en",
        f = [],
        o = new RegExp(/^\w+\: +(.+)$/),
        h = new RegExp(/^\s*((\{\s*(\-?\d+[\s*,\s*\-?\d+]*)\s*\})|([\[\]])\s*(-Inf|\-?\d+)\s*,\s*(\+?Inf|\-?\d+)\s*([\[\]]))\s?(.+?)$/),
        d = new RegExp(/^\s*(\{\s*(\-?\d+[\s*,\s*\-?\d+]*)\s*\})|([\[\]])\s*(-Inf|\-?\d+)\s*,\s*(\+?Inf|\-?\d+)\s*([\[\]])/),
        p = {
            locale: i(),
            fallback: u,
            placeHolderPrefix: "%",
            placeHolderSuffix: "%",
            defaultDomain: "messages",
            pluralSeparator: "|",
            add: function(e, a, s, n) {
                var c = n || this.locale || this.fallback,
                    r = s || this.defaultDomain;
                return l[c] || (l[c] = {}), l[c][r] || (l[c][r] = {}), l[c][r][e] = a, !1 === t(f, r) && f.push(r), this
            },
            trans: function(s, n, c, r) {
                return e(a(s, c, r, this.locale, this.fallback), n || {})
            },
            transChoice: function(s, c, r, t, i) {
                var l = a(s, t, i, this.locale, this.fallback),
                    u = parseInt(c, 10);
                return r = r || {}, void 0 === r.count && (r.count = c), void 0 === l || isNaN(u) || (l = n(l, u, i || this.locale || this.fallback)), e(l, r)
            },
            fromJSON: function(e) {
                if ("string" == typeof e && (e = JSON.parse(e)), e.locale && (this.locale = e.locale), e.fallback && (this.fallback = e.fallback), e.defaultDomain && (this.defaultDomain = e.defaultDomain), e.translations)
                    for (var a in e.translations)
                        for (var s in e.translations[a])
                            for (var n in e.translations[a][s]) this.add(n, e.translations[a][s][n], s, a);
                return this
            },
            reset: function() {
                l = {}, f = [], this.locale = i()
            }
        };
    return p
});