/*

 Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
 For more information see LICENSE.txt or http://www.wtfpl.net/
 For more information, the home page:
 http://pieroxy.net/blog/pages/lz-string/testing.html
 LZ-based compression algorithm, version 1.3.3
*/
'use strict';
var e, m = {
    Mb: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    Sc: String.fromCharCode,
    hg: function(a) {
        if (null == a) return "";
        var b = "",
        c, d, f, g, h, l, k = 0;
        for (a = m.wf(a); k < 2 * a.length;) 0 == k % 2 ? (c = a.charCodeAt(k / 2) >> 8, d = a.charCodeAt(k / 2) & 255, f = k / 2 + 1 < a.length ? a.charCodeAt(k / 2 + 1) >> 8 : NaN) : (c = a.charCodeAt((k - 1) / 2) & 255, (k + 1) / 2 < a.length ? (d = a.charCodeAt((k + 1) / 2) >> 8, f = a.charCodeAt((k + 1) / 2) & 255) : d = f = NaN),
        k += 3,
        g = c >> 2,
        c = (c & 3) << 4 | d >> 4,
        h = (d & 15) << 2 | f >> 6,
        l = f & 63,
        isNaN(d) ? h = l = 64 : isNaN(f) && (l = 64),
        b = b + m.Mb.charAt(g) + m.Mb.charAt(c) + m.Mb.charAt(h) + m.Mb.charAt(l);
        return b
    },
    ig: function(a) {
        if (null == a) return "";
        var b = "",
        c = 0,
        d, f, g, h, l, k, s = 0,
        n = m.Sc;
        for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); s < a.length;) f = m.Mb.indexOf(a.charAt(s++)),
        g = m.Mb.indexOf(a.charAt(s++)),
        l = m.Mb.indexOf(a.charAt(s++)),
        k = m.Mb.indexOf(a.charAt(s++)),
        f = f << 2 | g >> 4,
        g = (g & 15) << 4 | l >> 2,
        h = (l & 3) << 6 | k,
        0 == c % 2 ? (d = f << 8, 64 != l && (b += n(d | g)), 64 != k && (d = h << 8)) : (b += n(d | f), 64 != l && (d = g << 8), 64 != k && (b += n(d | h))),
        c += 3;
        return m.xf(b)
    },
    vg: function(a) {
        if (null == a) return "";
        var b = "",
        c, d, f, g = 0,
        h = m.Sc;
        a = m.wf(a);
        for (c = 0; c < a.length; c++) switch (d = a.charCodeAt(c), g++) {
        case 0:
            b += h((d >> 1) + 32);
            f = (d & 1) << 14;
            break;
        case 1:
            b += h(f + (d >> 2) + 32);
            f = (d & 3) << 13;
            break;
        case 2:
            b += h(f + (d >> 3) + 32);
            f = (d & 7) << 12;
            break;
        case 3:
            b += h(f + (d >> 4) + 32);
            f = (d & 15) << 11;
            break;
        case 4:
            b += h(f + (d >> 5) + 32);
            f = (d & 31) << 10;
            break;
        case 5:
            b += h(f + (d >> 6) + 32);
            f = (d & 63) << 9;
            break;
        case 6:
            b += h(f + (d >> 7) + 32);
            f = (d & 127) << 8;
            break;
        case 7:
            b += h(f + (d >> 8) + 32);
            f = (d & 255) << 7;
            break;
        case 8:
            b += h(f + (d >> 9) + 32);
            f = (d & 511) << 6;
            break;
        case 9:
            b += h(f + (d >> 10) + 32);
            f = (d & 1023) << 5;
            break;
        case 10:
            b += h(f + (d >> 11) + 32);
            f = (d & 2047) << 4;
            break;
        case 11:
            b += h(f + (d >> 12) + 32);
            f = (d & 4095) << 3;
            break;
        case 12:
            b += h(f + (d >> 13) + 32);
            f = (d & 8191) << 2;
            break;
        case 13:
            b += h(f + (d >> 14) + 32);
            f = (d & 16383) << 1;
            break;
        case 14:
            b += h(f + (d >> 15) + 32, (d & 32767) + 32),
            g = 0
        }
        return b + h(f + 32)
    },
    wg: function(a) {
        if (null == a) return "";
        for (var b = "",
        c, d, f = 0,
        g = 0,
        h = m.Sc; g < a.length;) {
            d = a.charCodeAt(g) - 32;
            switch (f++) {
            case 0:
                c = d << 1;
                break;
            case 1:
                b += h(c | d >> 14);
                c = (d & 16383) << 2;
                break;
            case 2:
                b += h(c | d >> 13);
                c = (d & 8191) << 3;
                break;
            case 3:
                b += h(c | d >> 12);
                c = (d & 4095) << 4;
                break;
            case 4:
                b += h(c | d >> 11);
                c = (d & 2047) << 5;
                break;
            case 5:
                b += h(c | d >> 10);
                c = (d & 1023) << 6;
                break;
            case 6:
                b += h(c | d >> 9);
                c = (d & 511) << 7;
                break;
            case 7:
                b += h(c | d >> 8);
                c = (d & 255) << 8;
                break;
            case 8:
                b += h(c | d >> 7);
                c = (d & 127) << 9;
                break;
            case 9:
                b += h(c | d >> 6);
                c = (d & 63) << 10;
                break;
            case 10:
                b += h(c | d >> 5);
                c = (d & 31) << 11;
                break;
            case 11:
                b += h(c | d >> 4);
                c = (d & 15) << 12;
                break;
            case 12:
                b += h(c | d >> 3);
                c = (d & 7) << 13;
                break;
            case 13:
                b += h(c | d >> 2);
                c = (d & 3) << 14;
                break;
            case 14:
                b += h(c | d >> 1);
                c = (d & 1) << 15;
                break;
            case 15:
                b += h(c | d),
                f = 0
            }
            g++
        }
        return m.xf(b)
    },
    wf: function(a) {
        if (null == a) return "";
        var b, c, d = {},
        f = {},
        g = "",
        h = "",
        l = "",
        k = 2,
        s = 3,
        n = 2,
        u = "",
        t = 0,
        v = 0,
        B, I = m.Sc;
        for (B = 0; B < a.length; B += 1) if (g = a.charAt(B), Object.prototype.hasOwnProperty.call(d, g) || (d[g] = s++, f[g] = !0), h = l + g, Object.prototype.hasOwnProperty.call(d, h)) l = h;
        else {
            if (Object.prototype.hasOwnProperty.call(f, l)) {
                if (256 > l.charCodeAt(0)) {
                    for (b = 0; b < n; b++) t <<= 1,
                    15 == v ? (v = 0, u += I(t), t = 0) : v++;
                    c = l.charCodeAt(0);
                    for (b = 0; 8 > b; b++) t = t << 1 | c & 1,
                    15 == v ? (v = 0, u += I(t), t = 0) : v++,
                    c >>= 1
                } else {
                    c = 1;
                    for (b = 0; b < n; b++) t = t << 1 | c,
                    15 == v ? (v = 0, u += I(t), t = 0) : v++,
                    c = 0;
                    c = l.charCodeAt(0);
                    for (b = 0; 16 > b; b++) t = t << 1 | c & 1,
                    15 == v ? (v = 0, u += I(t), t = 0) : v++,
                    c >>= 1
                }
                k--;
                0 == k && (k = Math.pow(2, n), n++);
                delete f[l]
            } else for (c = d[l], b = 0; b < n; b++) t = t << 1 | c & 1,
            15 == v ? (v = 0, u += I(t), t = 0) : v++,
            c >>= 1;
            k--;
            0 == k && (k = Math.pow(2, n), n++);
            d[h] = s++;
            l = String(g)
        }
        if ("" !== l) {
            if (Object.prototype.hasOwnProperty.call(f, l)) {
                if (256 > l.charCodeAt(0)) {
                    for (b = 0; b < n; b++) t <<= 1,
                    15 == v ? (v = 0, u += I(t), t = 0) : v++;
                    c = l.charCodeAt(0);
                    for (b = 0; 8 > b; b++) t = t << 1 | c & 1,
                    15 == v ? (v = 0, u += I(t), t = 0) : v++,
                    c >>= 1
                } else {
                    c = 1;
                    for (b = 0; b < n; b++) t = t << 1 | c,
                    15 == v ? (v = 0, u += I(t), t = 0) : v++,
                    c = 0;
                    c = l.charCodeAt(0);
                    for (b = 0; 16 > b; b++) t = t << 1 | c & 1,
                    15 == v ? (v = 0, u += I(t), t = 0) : v++,
                    c >>= 1
                }
                k--;
                0 == k && (k = Math.pow(2, n), n++);
                delete f[l]
            } else for (c = d[l], b = 0; b < n; b++) t = t << 1 | c & 1,
            15 == v ? (v = 0, u += I(t), t = 0) : v++,
            c >>= 1;
            k--;
            0 == k && n++
        }
        c = 2;
        for (b = 0; b < n; b++) t = t << 1 | c & 1,
        15 == v ? (v = 0, u += I(t), t = 0) : v++,
        c >>= 1;
        for (;;) if (t <<= 1, 15 == v) {
            u += I(t);
            break
        } else v++;
        return u
    },
    xf: function(a) {
        if (null == a) return "";
        if ("" == a) return null;
        for (var b = [], c = 4, d = 4, f = 3, g = "", h = "", l, k, s, n, u, t = m.Sc, v = a.charCodeAt(0), B = 32768, I = 1, h = 0; 3 > h; h += 1) b[h] = h;
        g = 0;
        s = Math.pow(2, 2);
        for (n = 1; n != s;) k = v & B,
        B >>= 1,
        0 == B && (B = 32768, v = a.charCodeAt(I++)),
        g |= (0 < k ? 1 : 0) * n,
        n <<= 1;
        switch (g) {
        case 0:
            g = 0;
            s = Math.pow(2, 8);
            for (n = 1; n != s;) k = v & B,
            B >>= 1,
            0 == B && (B = 32768, v = a.charCodeAt(I++)),
            g |= (0 < k ? 1 : 0) * n,
            n <<= 1;
            u = t(g);
            break;
        case 1:
            g = 0;
            s = Math.pow(2, 16);
            for (n = 1; n != s;) k = v & B,
            B >>= 1,
            0 == B && (B = 32768, v = a.charCodeAt(I++)),
            g |= (0 < k ? 1 : 0) * n,
            n <<= 1;
            u = t(g);
            break;
        case 2:
            return ""
        }
        for (l = h = b[3] = u;;) {
            if (I > a.length) return "";
            g = 0;
            s = Math.pow(2, f);
            for (n = 1; n != s;) k = v & B,
            B >>= 1,
            0 == B && (B = 32768, v = a.charCodeAt(I++)),
            g |= (0 < k ? 1 : 0) * n,
            n <<= 1;
            switch (u = g) {
            case 0:
                g = 0;
                s = Math.pow(2, 8);
                for (n = 1; n != s;) k = v & B,
                B >>= 1,
                0 == B && (B = 32768, v = a.charCodeAt(I++)),
                g |= (0 < k ? 1 : 0) * n,
                n <<= 1;
                b[d++] = t(g);
                u = d - 1;
                c--;
                break;
            case 1:
                g = 0;
                s = Math.pow(2, 16);
                for (n = 1; n != s;) k = v & B,
                B >>= 1,
                0 == B && (B = 32768, v = a.charCodeAt(I++)),
                g |= (0 < k ? 1 : 0) * n,
                n <<= 1;
                b[d++] = t(g);
                u = d - 1;
                c--;
                break;
            case 2:
                return h
            }
            0 == c && (c = Math.pow(2, f), f++);
            if (b[u]) g = b[u];
            else if (u === d) g = l + l.charAt(0);
            else return null;
            h += g;
            b[d++] = l + g.charAt(0);
            c--;
            l = g;
            0 == c && (c = Math.pow(2, f), f++)
        }
    }
};
"undefined" !== typeof module && null != module && (module.xg = m);
function p() {
    return Date.now ? Date.now() : (new Date).valueOf()
};
function q(a) {
    return 2147483648 > a ? a | 0 : Math.floor(a)
};
function r(a) {
    return q(Math.random() * a)
};
function aa(a) {
    return 1E4 > a ? "" + q(a) : 1E5 > a ? (a / 1E3).toFixed(1) + "K": 1E6 > a ? q(a / 1E3) + "K": 1E7 > a ? (a / 1E6).toFixed(2) + "M": 1E8 > a ? (a / 1E6).toFixed(1) + "M": 1E9 > a ? q(a / 1E6) + "M": 1E10 > a ? (a / 1E9).toFixed(2) + "B": 1E11 > a ? (a / 1E9).toFixed(1) + "B": 1E12 > a ? q(a / 1E9) + "B": 1E13 > a ? (a / 1E12).toFixed(2) + "T": 1E14 > a ? (a / 1E12).toFixed(1) + "T": 1E15 > a ? q(a / 1E12) + "T": 1E16 > a ? (a / 1E15).toFixed(2) + "P": 1E17 > a ? (a / 1E15).toFixed(1) + "P": 1E18 > a ? q(a / 1E15) + "P": 1E19 > a ? (a / 1E18).toFixed(2) + "P": 1E20 > a ? (a / 1E18).toFixed(1) + "P": 1E21 > a ? q(a / 1E18) + "P": 1E22 > a ? (a / 1E21).toFixed(2) + "Z": 9.999999999999999E22 > a ? (a / 1E21).toFixed(1) + "Z": 1E24 > a ? q(a / 1E21) + "Z": 1E25 > a ? (a / 1E24).toFixed(2) + "Y": 1E26 > a ? (a / 1E24).toFixed(1) + "Y": 1E27 > a ? q(a / 1E24) + "Y": a.toFixed(0)
}
function w(a) {
    return 0 <= a ? aa(a) : "-" + aa( - a)
};
function x(a) {
    if (!a) return "";
    a = a.replace("&", "&amp;");
    a = a.replace("<", "&lt;");
    a = a.replace(">", "&gt;");
    a = a.replace('"', "&quot;");
    a = a.replace("'", "&#x27;");
    return a = a.replace("/", "&#x2F;")
};
function y(a, b) {
    "undefined" != typeof ganal && ganal("send", "event", a, b)
};
function z(a, b) {
    return Math.max(0.1, 1 - (Math.abs(a.za - a.e) + Math.abs(b.oa - b.e)))
};
function ba(a, b) {
    this.ee = a;
    this.fe = b
};
function ca() {
    this.fb = [];
    this.mb = null;
    this.qc = -1
}
function da(a, b) {
    a.mb = null;
    a.qc = p();
    if (b) a.fb.length = 0,
    ea();
    else {
        var c = Math.min(a.fb.length, A.a.P.ja * fa);
        if (a.fb.length > c) {
            for (; a.fb.length > c;) a.fb.splice(r(a.fb.length), 1);
            ea();
            ga(a)
        }
    }
}
ca.prototype.W = function() {
    da(this, !1)
};
ca.prototype.We = function() {
    if (this.mb) {
        var a = this.mb;
        this.fb.push(a);
        ha(a);
        this.mb = null;
        this.qc = p()
    }
};
function ia() {
    return A.a.qa.fb
}
function ga(a) {
    var b;
    for (b = 0; b < a.fb.length; b++) ha(a.fb[b])
}
function ha(a) {
    a = C[a.fe];
    a.e += a.ta;
    0 > a.ta && a.e < a.fd && (a.e = a.fd)
}
function ea() {
    var a, b;
    for (a = 0; a < C.length; a++) b = C[a],
    b.e = b.oa
}
ca.prototype.Te = function() {
    if (this.mb || p() - this.qc < ja) return ! 1;
    if (Math.random() < ka) {
        var a = A.bg;
        this.mb = new ba(a.bf[r(a.bf.length)] + "" + a.ef[r(a.ef.length)], r(C.length));
        return ! 0
    }
    return ! 1
};
function la() {
    this.Vb = this.ya = this.Bd = this.yd = this.Sd = this.Kd = 0;
    this.Ia = -1
}
function D() {
    var a = A.a.M;
    if ( - 1 === a.Ia) {
        var b;
        for (b = 0; b < A.a.c.length; b++) a.Ia < A.a.c[b].ra && (a.Ia = A.a.c[b].ra)
    }
    return a.Ia
}
la.prototype.Le = function(a) {
    this.Ia < a && (this.Ia = a)
};
la.prototype.gd = function() {
    this.Ia = -1
};
function ma() {
    var a = A.a.na;
    a.pc = 1;
    a.Yb = !1;
    a.bd = na(a.Ae)
}
function oa(a) {
    var b = A.a.na;
    b.bd = a ? a: na(b.Ae)
};
var E = 7;
function pa() {
    this.tb = this.w = "";
    this.dd = 0;
    this.H = "";
    this.ub = 0;
    this.ed = E;
    this.Ie = this.j = this.ca = 0;
    this.Pd = !1
}
pa.prototype.Ha = function() {
    return this.ed
};
function qa() {
    this.O = this.wa = "";
    this.Bc = this.Fa = this.nf = this.ra = 0;
    this.Fb = 100;
    this.items = [];
    this.Aa = {};
    this.Ea = null;
    this.i = 0
}
qa.prototype.ld = function(a) {
    this.i = a
};
function ra(a) {
    return a.nf * (sa.e + ta.e + (1 + A.a.P.ja * ua) - 2)
}
qa.prototype.getItem = function(a) {
    return a >= this.items.length ? null: this.items[a]
};
function F(a, b) {
    var c = b.w,
    d = a.Aa[c];
    d ? (d = a.items.indexOf(d), -1 !== d ? a.items[d] = b: a.items.push(b), delete a.Aa[c]) : a.items.push(b);
    a.Aa[c] = b;
    G(a)
}
function G(a) {
    var b = 0,
    c;
    for (c = 0; c < a.items.length; c++) b += a.items[c].j;
    a.nf = b
};
function va() {
    this.items = [];
    this.uc = {};
    this.Zf = function(a, b) {
        var c = b.j - a.j;
        return 0 === c ? a.ca - b.ca: c
    };
    this.sg = function(a, b) {
        var c = A.a.R[a.H].Aa[a.w],
        d = A.a.R[b.H].Aa[b.w],
        c = (b.j - (d ? d.j: 0)) / b.ca - (a.j - (c ? c.j: 0)) / a.ca;
        return 0 === c ? a.ca - b.ca: c
    }
}
function wa(a) {
    a.items.length = 0;
    a.uc = {}
}
function xa(a, b) {
    var c = 0,
    d, f = b.O;
    for (delete a.uc[f]; c < a.items.length;) d = a.items[c],
    d.H === f ? a.items.splice(c, 1) : c++
}
function ya(a, b) {
    a.items.push(b);
    var c = a.items; ! c || 2 > c.length || c.sort(a.Zf);
    c = a.uc[b.H];
    c || (c = [], a.uc[b.H] = c);
    c.push(b); ! c || 2 > c.length || c.sort(a.Zf)
}
va.prototype.removeItem = function(a) {
    za(this, this.items.indexOf(a))
};
function za(a, b) {
    if ( - 1 !== b) {
        var c = a.items[b];
        a.items.splice(b, 1);
        var d = a.uc[c.H];
        d && (c = d.indexOf(c), -1 !== c && d.splice(c, 1))
    }
}
function Aa(a) {
    var b, c = 0;
    for (b = 0; b < a.items.length; b++) - 1 > a.items[b].j && (c = b);
    return c
}
function Ba(a) {
    for (var b = 0; b < a.items.length;) Ca(a.items[b]) ? b++:za(a, b)
}
function Ca(a) {
    var b = A.a.R[a.H];
    if (!b) return ! 1;
    b = b.Aa[a.w];
    return ! b || b.j < a.j
};
function Da() {}
Da.prototype = new va;
function Ea(a) {
    var b = A.a.Va;
    if (Ca(a)) {
        var c = b.items;
        if (c.length < Fa + A.a.P.ja * Ga) ya(b, a);
        else {
            var d = Aa(b);
            a.j > c[d].j && (za(b, d), ya(b, a))
        }
    }
};
function Ha() {}
Ha.prototype = new va;
function Ia(a) {
    var b = A.a.nb,
    c = b.items;
    c.length >= Ja && Ba(b);
    if (c.length < Ja) ya(b, a),
    a.Ie = Ka(a);
    else if (Ca(a)) {
        var d = Aa(b),
        c = c[d];
        a.j > c.j ? (za(b, d), Ea(c), ya(b, a), a.Ie = Ka(a)) : Ea(a)
    }
}
function Ka(a) {
    var b = p(),
    c = A.a.R[a.H].Aa[a.w];
    return b = c && c.j >= a.j ? b + La: b + Ma
};
function Na() {
    this.Zd = this.$d = this.vb = -1
}
Na.prototype = new va;
function Oa() {
    var a = A.a.Y,
    b = z(Pa, Qa); ( - 1 === a.vb || p() - a.vb > Ra * b) && Sa(a);
    b = z(Pa, Qa);
    b = (Ra * b - (p() - a.vb)) / 1E3;
    a.Zd = q(b / 60);
    a.$d = q(b % 60)
}
function Sa(a) {
    if (0 !== A.a.c.length) {
        wa(a);
        a.vb = p();
        var b, c, d, f = D(),
        g = Ta * A.a.c.length + Ua.e + Va.e;
        for (b = 0; b < g; b++) c = A.a.c[r(A.a.c.length)],
        d = z(Wa, Xa),
        ya(a, Ya(c, d, f))
    }
};
function Za() {
    this.Bf = this.Ge = 1;
    this.fc = null;
    this.Ce = "";
    this.Ee = this.lc = this.ag = this.He = this.Rc = this.Df = this.Ff = 0;
    this.Dd = this.Hd = !1
}
function $a(a, b, c, d, f, g, h, l) {
    var k = A.a.Eb;
    k.baseName = a;
    k.Ce = b;
    k.Bf = c;
    k.Ge = d;
    k.Ff = f * z(ab, bb);
    k.Df = g;
    k.fc = l;
    k.Rc = f * d;
    k.He = k.Rc;
    k.ag = h;
    k.lc = f;
    k.Ee = 0;
    k.Hd = !1;
    k.Dd = !1
}
Za.prototype.Md = function() {
    return this.Bf
};
function cb() {
    this.Ia = -1;
    this.Cb = 0
}
function db() {
    var a = A.a.Cb;
    a.Cb = 0;
    a.Ia = -1
}
cb.prototype.Le = function(a) {
    this.Ia < a && (this.Ia = a, this.Cb = eb())
};
function fb() {
    var a = A.a.Cb;
    if (0 === a.Cb || -1 === a.Ia) a.Ia = D(),
    a.Cb = eb();
    return a.Cb * (gb.e + hb.e - 1)
};
function ib() {
    this.Na = this.Da = !1;
    this.Uc = -1
}
ib.prototype.W = function() {
    this.Na = this.Da = !1;
    this.Uc = p()
};
function jb() {
    this.xc = this.cc = !1
}
jb.prototype.W = function() {
    this.xc = this.cc = !1
};
jb.prototype.Re = function() {
    this.xc = this.cc = !1
};
function kb(a, b, c, d) {
    this.kf = a;
    this.hf = b;
    this.jf = c;
    this.Tf = d
};
function lb() {
    this.ja = 0;
    this.Wc = []
};
function mb(a, b) {
    this.Wa = a;
    this.Oc = b;
    this.Xb = 0;
    this.wb = !1
};
function nb() {
    this.Nc = [];
    this.yb = [];
    this.Nb = {};
    this.Oa = 0;
    this.Bb = null;
    this.Pb = -1
}
e = nb.prototype;
e.Re = function() {
    this.Nc.length = 0;
    this.yb.length = 0;
    this.Nb = {};
    this.Bb = null;
    this.Pb = p()
};
e.W = function() {
    this.Nc.length = 0;
    this.yb.length = 0;
    this.Nb = {};
    this.Bb = null;
    this.Pb = p()
};
e.ce = function() {
    this.Bb && (ob(this, this.Bb), this.Bb = null, this.Pb = p())
};
function pb() {
    return A.a.S.Bb
}
function qb() {
    return A.a.S.Nc
}
function ob(a, b) {
    a.Nb[b.Wa] || (a.Nc.push(b), b.wb ? a.Oa++:a.Nb[b.Wa] = b)
}
e.Ue = function() {
    if (this.Bb || p() - this.Pb < rb) return ! 1;
    if (Math.random() < sb) {
        for (var a = tb(), b = this.Nb[a]; b && !b.wb;) a = tb(),
        b = this.Nb[a];
        this.Bb = new mb(a, ub + r(vb) * wb);
        return ! 0
    }
    return ! 1
};
e.Me = function(a) {
    var b = a.Wa;
    for (a = 0; a < this.yb.length; a++) if (b === this.yb[a].Wa) {
        this.yb.splice(a, 1);
        break
    }
};
function xb() {
    this.jd = !1;
    this.sb = [];
    this.Ta = -1;
    this.Pc = this.Hc = !1;
    this.Zb = -1
}
xb.prototype.W = function() {
    this.jd = !1;
    this.sb.length = 0;
    this.Ta = -1;
    this.Pc = this.Hc = !1;
    this.Zb = p()
};
function yb() {
    return A.a.K.Hc
}
function zb() {
    return A.a.K.Pc
}
function H() {
    return A.a.K.jd
}
function Ab(a) {
    return 0 > a.Ta || a.Ta >= Bb.length ? null: Bb[a.Ta].ia
}
function Cb(a) {
    var b = A.a.K;
    a ? b.sb = a: b.sb.length = 0
}
function Db() {
    var a = A.a.K;
    if (a.jd || a.Pc) return ! 1;
    if (a.sb.length === Bb.length) {
        if (a.Hc || p() - a.Zb < Eb) return ! 1;
        if (Math.random() < Fb) return a.Hc = !0
    } else {
        if ( - 1 < a.Ta || p() - a.Zb < Eb) return ! 1;
        if (Math.random() < Fb) return a.Ta = a.sb.length,
        (a = Ab(a)) && y("Machine Part", a),
        !0
    }
    return ! 1
};
function Gb() {
    this.ic = !1;
    this.Dc = -1
}
Gb.prototype.W = function() {
    this.ic = !1;
    this.Dc = p()
};
function Hb() {
    var a = A.a.bc;
    return a.ic || p() - a.Dc < Ib ? !1 : Math.random() < Jb ? a.ic = !0 : !1
};
function Kb(a, b, c, d) {
    this.gf = a;
    this.eg = b;
    this.fg = c;
    this.Ve = d
}
Kb.prototype.rc = function() {
    return this.eg
};
function Lb() {
    this.hb = []
}
Lb.prototype.W = function() {
    this.hb.length = 0
};
function Mb() {
    this.Rb = this.i = -1;
    this.va = [];
    this.ab = [];
    this.eb = 0
}
Mb.prototype.W = function() {
    this.eb = 0;
    this.i = -1;
    this.Rb = p();
    this.va = Nb(this);
    this.ab = Ob()
};
Mb.prototype.ld = function(a) {
    this.i = a
};
Mb.prototype.gd = function() {
    this.eb--
};
function Nb(a) {
    var b = [],
    c;
    for (c = 0; c < A.k.length; c++) A.k[c].ma || a.Nd(c) || b.push(c);
    return b
}
function Ob() {
    var a = [],
    b,
    c;
    for (c = 0; c < A.a.c.length; c++) b = A.a.c[c].i,
    A.k[b].Qc || a.push(b);
    return a
}
function Pb(a, b) {
    var c;
    for (c = 0; c < a.va.length; c++) if (a.va[c] === b) {
        a.va.splice(c, 1);
        break
    }
}
Mb.prototype.Nd = function(a) {
    var b;
    for (b = 0; b < A.a.c.length; b++) if (A.a.c[b].i === a) return ! 0;
    return ! 1
};
function Qb() {
    this.G = !1;
    this.N = !0;
    this.qb = -1;
    this.qd = 18E4;
    this.Tc = 3E5
}
Qb.prototype.Ua = function() {};
Qb.prototype.cd = function() {};
function Rb(a, b) {
    return Math.max(0, a.qb + Math.max(Sb, a.Tc - A.a.P.ja * Tb) - b)
}
Qb.prototype.sd = function() {};
Qb.prototype.Ed = function() {};
function Ub(a) {
    a.G = !0;
    a.N = !1;
    a.qb = p() + a.qd;
    a.sd();
    var b = A.jb;
    b.Ab.push(a);
    b.Qb.splice(b.Qb.indexOf(a), 1);
    b.bb++;
    y("Ability", a.Ua())
}
function Vb(a) {
    a.G = !1;
    a.Ed();
    var b = A.jb;
    a = b.Ab.indexOf(a); - 1 !== a && b.Ab.splice(a, 1);
    b.bb++
};
function J(a) {
    this.yc = a;
    var b = a.Ga;
    this.qd = a.duration;
    this.Tc = b
}
J.prototype = new Qb;
J.prototype.Ua = function() {
    return this.yc.name
};
J.prototype.cd = function() {
    return this.yc.description
};
J.prototype.sd = function() {
    this.yc.e = this.yc.Ca
};
J.prototype.Ed = function() {
    this.yc.e = this.yc.za
};
function Wb() {
    var a = Xb;
    this.qd = Yb;
    this.Tc = a
}
Wb.prototype = new Qb;
Wb.prototype.Ua = function() {
    return Zb
};
Wb.prototype.cd = function() {
    return $b
};
Wb.prototype.sd = function() {
    Sa(A.a.Y)
};
Wb.prototype.Ed = function() {};
function ac() {
    var a = bc;
    this.qd = cc;
    this.Tc = a
}
ac.prototype = new Qb;
ac.prototype.Ua = function() {
    return dc
};
ac.prototype.cd = function() {
    return ec
};
ac.prototype.sd = function() {
    A.a.aa.Da = !0
};
ac.prototype.Ed = function() {};
function fc() {
    this.hc = [];
    this.Ab = [];
    this.Qb = [];
    this.bb = 0
}
function gc(a) {
    var b, c;
    for (b = 0; b < A.k.length; b++) if (c = A.k[b].ea) Vb(c),
    c.G = !1,
    c.N = !0,
    c.qb = -1;
    a.Ab.length = 0
}
function hc(a) {
    var b, c;
    a.bb = 0;
    a.hc.length = 0;
    a.Qb.length = 0;
    for (b = a.Ab.length = 0; b < A.a.c.length; b++) c = A.a.c[b].Ea,
    a.hc.push(c),
    c.N ? a.Qb.push(c) : c.G && a.Ab.push(c)
}
function ic(a) {
    var b = A.jb;
    a = a.Ea;
    b.hc.push(a);
    a.N ? b.Qb.push(a) : a.G && b.Ab.push(a);
    b.bb++
}
fc.prototype.gd = function(a) {
    a = a.Ea;
    var b = this.hc.indexOf(a),
    c = this.Qb.indexOf(a),
    d = this.Ab.indexOf(a);
    a.G && Vb(a); - 1 !== b && this.hc.splice(b, 1); - 1 !== c && this.Qb.splice(c, 1); - 1 !== d && this.Ab.splice(d, 1);
    this.bb++
};
function K(a) {
    return document.getElementById(a)
}
function L(a, b, c, d) {
    a = document.createElement(a);
    d && (a.className = d);
    c && (a.id = c);
    b && b.appendChild(a);
    return a
}
function M(a) {
    if (a = K(a)) for (; a.firstChild;) a.removeChild(a.firstChild)
}
function N(a, b) {
    if (a) for (var c = b ? 1 : 0; a.rows.length > c;) a.deleteRow(c)
}
function O(a) {
    a && (a.style.display = "none")
}
function P(a) {
    a && (a.style.display = "block")
}
function Q(a) {
    O(K(a))
}
function R(a) {
    P(K(a))
}
function jc(a, b) {
    var c = K(a);
    c && (c.className = b)
}
function S(a, b) {
    var c = K(a);
    c && (c.innerHTML = b)
}
function T(a, b) {
    var c = document.createElement("th");
    b && (c.className = b);
    a.appendChild(c);
    return c
};
function kc() {
    this.pa = -1;
    this.Je = "mainTabContainer machinePartsTabContainer artifactsTabContainer questsTabContainer defeatedBossesTabContainer championsTabContainer partyManagementTabContainer versionTabContainer".split(" ");
    this.Lf = "mainTab machinePartsTab artifactsTab questsTab defeatedBossesTab championsTab partyManagementTab versionTab".split(" ");
    this.kd = null
}
function lc() {
    return - 1 === A.input.pa
}
kc.prototype.setSelectedTabId = function(a) {
    this.kd !== a && (this.kd && jc(this.kd, ""), this.kd = a, jc(this.kd, "selectedTab"))
};
kc.prototype.displayCharacter = function(a) {
    this.pa !== a && (this.pa = a, -1 === a ? this.setSelectedTabId("tabParty") : this.setSelectedTabId("tabChar" + a))
};
function U(a) {
    var b = A.input,
    c;
    for (c = 0; c < b.Je.length; c++) c === a ? (R(b.Je[c]), jc(b.Lf[c], "selectedTab")) : (Q(b.Je[c]), jc(b.Lf[c], ""))
}
kc.prototype.onAttackButtonPress = function() {
    A.a.M.Bd++;
    mc(A.ke, null, fb(), !0)
};
kc.prototype.handleKeyPress = function(a) {
    if (0 !== A.a.c.length) if (37 === a.keyCode) a = this.pa - 1,
    -1 > a && (a = A.a.c.length - 1),
    this.displayCharacter(a);
    else if (39 === a.keyCode) a = this.pa + 1,
    a === A.a.c.length && (a = -1),
    this.displayCharacter(a);
    else this.onAttackButtonPress()
};
function nc() {
    this.pb = this.Ud = null;
    this.ng = "partyButtonTable";
    this.Sf = !1;
    this.pa = -1;
    this.ie = []
}
nc.prototype.f = function() {};
nc.prototype.g = function() {
    var a = 0 === A.a.c.length;
    this.Sf !== a && (a ? (this.Ud || (this.Ud = K("partyCreationDiv"), oc(this)), R("partyCreationDisabledBackground"), P(this.Ud)) : (Q("partyCreationDisabledBackground"), O(this.Ud)), this.Sf = a)
};
function oc(a) {
    var b = K(a.ng),
    c = 0,
    d,
    f;
    for (f = 0; f < A.k.length; f += 2) A.k[f].ma || (d = b.insertRow(c++), pc(a, d.insertCell(0), f), pc(a, d.insertCell(1), f + 1));
    a.pb = L("a", K("startQuestButtonDiv"), null, "startQuestButton");
    a.pb.innerHTML = "开始任务!";
    a.pb.onclick = function() {
        if ( - 1 < a.pa) {
            var b = [a.pa],
            c,
            d;
            for (c = 0; c < b.length; c++) d = qc(b[c]),
            A.a.c.push(d),
            A.a.R[d.O] = d,
            y("Character", "主要角色: " + d.O);
            db();
            A.a.aa.W();
            ma();
            A.a.bc.W();
            A.a.K.W();
            A.a.kb.W();
            A.a.qa.W();
            A.a.S.W();
            A.a.t.W();
            Sa(A.a.Y);
            wa(A.a.Va);
            A.dc.f();
            b = A.jb;
            gc(b);
            hc(b);
            rc()
        }
    };
    a.pb.style.display = -1 === a.pa ? "none": "inline"
}
function pc(a, b, c) {
    if (! (c >= A.k.length)) {
        b.className = "unselectedPartyCharacterCell";
        a.ie.push(b);
        b.onclick = function() {
            sc(a, c)
        };
        b = L("div", b, null, "partyCharacterContainer");
        b.onclick = function() {
            sc(a, c)
        };
        var d = L("div", b, null, "partyCharacterNameDiv");
        d.onclick = function() {
            sc(a, c)
        };
        var f = L("input", d, null, null);
        f.type = "text";
        f.size = 15;
        f.value = A.k[c].F;
        f.onkeyup = function() {
            A.k[c].F = x(f.value);
            f.value && "" !== f.value ? (a.pb.style.display = "inline-block", tc(a)) : a.pb.style.display = "none"
        };
        f.onchange = function() {
            A.k[c].F = x(f.value);
            f.value && "" !== f.value ? (a.pb.style.display = "inline-block", tc(a)) : a.pb.style.display = "none"
        };
        d.appendChild(document.createTextNode(" 职业:" + A.k[c].className));
        b = L("div", b, null, "partyCharacterDescriptionDiv");
        b.innerHTML = A.k[c].description;
        b.onclick = function() {
            sc(a, c)
        }
    }
}
function sc(a, b) {
    a.pa = b;
    var c;
    for (c = 0; c < a.ie.length; c++) a.ie[c].className = c !== a.pa ? "unselectedPartyCharacterCell": "selectedPartyCharacterCell"; - 1 === a.pa ? a.pb.style.display = "none": (tc(a), a.pb.style.display = "inline-block")
}
function tc(a) {
    if ( - 1 !== a.pa) {
        var b = A.k[a.pa];
        a.pb.innerHTML = b.F + " 职业:" + b.className + ",年轻而幼稚,愚蠢地步入地下城的入口..."
    }
};
function V() {
    this.ua = -1;
    this.Fd = this.l = this.m = this.u = this.D = null
}
V.prototype.f = function() {};
V.prototype.g = function(a) {
    var b = !this.Fd || a != this.Fd;
    this.Fd = a;
    this.wc(a, b)
};
V.prototype.wc = function() {};
function uc(a) {
    if (a.Pd) return "空白";
    switch (a.Ha()) {
    case 0:
        return "艰苦的";
    case 1:
        return "垃圾的";
    case 2:
        return "可怜的";
    case 3:
        return "瑕疵的";
    case 4:
        return "较少的";
    case 5:
        return "次品的";
    case 6:
        return "朴实的";
    case E:
        return "普通的";
    case 8:
        return "标准的";
    case 9:
        return "精致的";
    case 10:
        return "保险的";
    case 11:
        return "优胜的";
    case 12:
        return "原始的";
    case 13:
        return "完善的";
    case 14:
        return "完美的";
    case 15:
        return "史诗的";
    case 16:
        return "著名的";
    case 17:
        return "传说的";
    case 18:
        return "神话的";
    case 19:
        return "崇高的";
    case 20:
        return "神圣的";
    case 21:
        return "辉煌的";
    case 22:
        return "天赐的";
    case 23:
        return "上帝的";
    case 24:
        return "不朽的";
    case 25:
        return "永恒的";
    case 26:
        return "优雅的";
    case 27:
        return "星光的";
    case 28:
        return "天堂的";
    case 29:
        return "宇宙的";
    case 30:
        return "银河的";
    case 31:
        return "卓越的";
    case 40:
        return "独特的";
    default:
        return "找到BUG: " + a.Ha()
    }
}
function W(a, b) {
    return b ? a ? "alt itemValueBetter": "itemValueBetter": a ? "alt itemValueWorse": "itemValueWorse"
}
function X(a, b) {
    var c;
    switch (b) {
    case 0:
        c = "itemQualityWretched";
        break;
    case 1:
        c = "itemQualityGarbage";
        break;
    case 2:
        c = "itemQualityPathetic";
        break;
    case 3:
        c = "itemQualityFlawed";
        break;
    case 4:
        c = "itemQualityLesser";
        break;
    case 5:
        c = "itemQualityInferior";
        break;
    case 6:
        c = "itemQualityPlain";
        break;
    case E:
        c = "itemQualityCommon";
        break;
    case 8:
        c = "itemQualityStandard";
        break;
    case 9:
        c = "itemQualityRefined";
        break;
    case 10:
        c = "itemQualityPremium";
        break;
    case 11:
        c = "itemQualitySuperior";
        break;
    case 12:
        c = "itemQualityPristine";
        break;
    case 13:
        c = "itemQualityPerfect";
        break;
    case 14:
        c = "itemQualityFlawless";
        break;
    case 15:
        c = "itemQualityHeroic";
        break;
    case 16:
        c = "itemQualityHistoric";
        break;
    case 17:
        c = "itemQualityFabled";
        break;
    case 18:
        c = "itemQualityMythical";
        break;
    case 19:
        c = "itemQualitySublime";
        break;
    case 20:
        c = "itemQualitySacred";
        break;
    case 21:
        c = "itemQualityGlorious";
        break;
    case 22:
        c = "itemQualityDivine";
        break;
    case 23:
        c = "itemQualityGodlike";
        break;
    case 24:
        c = "itemQualityImmortal";
        break;
    case 25:
        c = "itemQualityEternal";
        break;
    case 26:
        c = "itemQualityEthereal";
        break;
    case 27:
        c = "itemQualityAstral";
        break;
    case 28:
        c = "itemQualityCelestial";
        break;
    case 29:
        c = "itemQualityCosmic";
        break;
    case 30:
        c = "itemQualityGalactic";
        break;
    case 31:
        c = "itemQualityTranscendent";
        break;
    case 40:
        c = "itemQualityUnique";
        break;
    default:
        c = "itemQualityCommon"
    }
    return a ? "alt " + c: c
}
function vc(a, b) {
    var c = b.indexOf(a);
    return - 1 === c ? b: b.substring(0, c) + '<span style="color:#00A;">' + a + "</span>" + b.substring(c + a.length)
};
function wc() {
    this.b = "party_statistics_container";
    this.h = !1;
    this.Vf = "party_statistics_table";
    this.Mc = null;
    this.qf = "character_statistics_table";
    this.Cc = null;
    this.Ad = [];
    this.tf = this.ff = this.sf = this.$f = this.Hb = this.Kc = null;
    this.ue = this.se = this.te = this.ze = this.rb = this.oc = -1
}
wc.prototype.f = function() {
    this.se = this.ue = this.te = this.ze = this.rb = this.oc = -1;
    var a = K(this.b); (this.Mc = K(this.Vf)) ? N(this.Mc, !1) : this.Mc = L("table", a, this.Vf, "cleanTable");
    var b = this.Mc.insertRow(0),
    a = this.Mc.insertRow(1),
    c = T(b, "firstColumn"),
    d = T(b, null),
    f = T(b, null),
    g = T(b, null),
    h = T(b, null),
    b = T(b, null);
    c.innerHTML = "黄金";
    d.innerHTML = "杀戮";
    f.innerHTML = "总计CPS";
    g.innerHTML = "点击伤害";
    h.innerHTML = "首领杀戮";
    b.innerHTML = "点击";
    c.title = "从敌人的尸体上获取黄金.黄金可以用来提升你的武器,所以尽可能多的制造尸体吧.";
    d.title = "这数字代表你杀害了多少生命.他们大部分都是好人,只是想交个朋友.他们也有家人.";
    h.title = "这数字代表你战胜首领怪物的次数.";
    b.title = "腕管综合征从10000次点击开始.";
    this.Kc = a.insertCell(0);
    this.Hb = a.insertCell(1);
    this.$f = a.insertCell(2);
    this.sf = a.insertCell(3);
    this.ff = a.insertCell(4);
    this.tf = a.insertCell(5);
    this.Kc.className = "firstColumn";
    a = K(this.b); (this.Cc = K(this.qf)) ? N(this.Cc, !0) : (this.Cc = L("table", a, this.qf, "cleanTable"), h = this.Cc.insertRow(0), a = T(h, "noBackground"), c = T(h, null), d = T(h, null), f = T(h, null), g = T(h, null), h = T(h, null), a.innerHTML = "角色统计数据", c.innerHTML = "职业", d.innerHTML = "等级", f.innerHTML = "CPS", g.innerHTML = "经验", h.innerHTML = "杀戮");
    for (a = this.Ad.length = 0; a < A.a.c.length; a++) c = this.Cc.insertRow(a + 1),
    c = new xc(a, c),
    c.f(),
    this.Ad.push(c);
    Q(this.b);
    this.h = !1
};
wc.prototype.g = function() {
    if (0 !== A.a.c.length) {
        var a = lc();
        this.h !== a && ((this.h = a) ? R(this.b) : Q(this.b));
        if (a) {
            var b = A.a.M,
            a = b.Sd,
            c, d = 0;
            for (c = 0; c < A.a.c.length; c++) d += ra(A.a.c[c]);
            c = d;
            var d = fb(),
            f = b.yd,
            g = b.Bd,
            b = b.ya;
            b !== this.oc && (this.Kc.innerHTML = w(b), this.oc = b);
            a !== this.rb && (this.Hb.innerHTML = w(a), this.rb = a);
            c !== this.ze && (this.$f.innerHTML = w(c), this.ze = c);
            d !== this.te && (this.sf.innerHTML = w(d), this.te = d);
            f !== this.se && (this.ff.innerHTML = w(f), this.se = f);
            g !== this.ue && (this.tf.innerHTML = w(g), this.ue = g);
            for (a = 0; a < this.Ad.length; a++) this.Ad[a].g()
        }
    }
};
function xc(a, b) {
    this.r = a;
    this.X = b;
    this.Hb = this.Ic = this.l = this.m = this.D = null;
    this.Gc = "";
    this.rb = this.Ec = this.zf = this.Db = -1
}
xc.prototype.f = function() {
    this.Pa()
};
xc.prototype.g = function() {
    var a = A.a.c[this.r];
    if (a) {
        var b = a.wa,
        c = a.ra,
        d = ra(a),
        f = a.Fa,
        a = a.Bc;
        b !== this.Gc && (this.Gc = this.D.innerHTML = b);
        c !== this.Db && (this.m.innerHTML = w(c), this.Db = c);
        d !== this.zf && (this.l.innerHTML = w(d), this.zf = d);
        f !== this.Ec && (this.Ic.innerHTML = w(f), this.Ec = f);
        a !== this.rb && (this.Hb.innerHTML = w(a), this.rb = a)
    }
};
xc.prototype.Pa = function() {
    this.D = this.X.insertCell(0);
    var a = this.X.insertCell(1);
    this.m = this.X.insertCell(2);
    this.l = this.X.insertCell(3);
    this.Ic = this.X.insertCell(4);
    this.Hb = this.X.insertCell(5);
    var b = 0 != (this.X.rowIndex + 1) % 2;
    this.D.className = b ? "firstColAlt": "firstCol";
    b && (a.className = "alt", this.m.className = "alt", this.l.className = "alt", this.Ic.className = "alt", this.Hb.className = "alt");
    if (b = A.a.c[this.r]) this.D.innerHTML = b.wa,
    a.innerHTML = b.O
};
function yc(a, b) {
    this.ua = a;
    this.I = this.l = this.m = this.u = this.V = this.lb = this.D = null;
    this.Ra = -1E5;
    this.Pa(b);
    this.xa = E;
    this.gb = this.Gb = !1
}
yc.prototype = new V;
yc.prototype.wc = function(a, b) {
    var c = A.a.R[a.H];
    if (c) {
        var d = c.Aa[a.w],
        f = d ? d.j: 0,
        d = a.j > f,
        f = a.j - f,
        g = 0 != this.ua % 2,
        h = a.Ha();
        b && (this.D.innerHTML = vc(a.w, a.tb), this.V.innerHTML = a.H, this.u.innerHTML = uc(a), this.m.innerHTML = w(a.ub), this.l.innerHTML = w(a.j), this.Gb = !d, this.xa = null, this.gb = !d);
        d !== this.Gb && ((this.Gb = d) ? (this.V.className = "buyButton", this.V.onclick = function() {
            F(c, a);
            A.a.nb.removeItem(a);
            G(c);
            return ! 1
        }) : (this.V.className = "disabledBuyButton", this.V.onclick = function() {
            return ! 1
        }));
        h != this.xa && (this.xa = h, this.u.className = X(g, h));
        d != this.gb && (this.gb = d, this.l.className = W(g, d));
        this.Ra !== f && (this.I.innerHTML = w(f), this.I.className = W(g, 0 < f), this.Ra = f)
    }
};
yc.prototype.Pa = function(a) {
    var b = 0 != this.ua % 2;
    this.D = a.insertCell(0);
    this.D.className = b ? "firstColAlt": "firstCol";
    this.lb = a.insertCell(1);
    this.u = a.insertCell(2);
    this.m = a.insertCell(3);
    this.l = a.insertCell(4);
    this.I = a.insertCell(5);
    this.lb.style.width = "75px";
    this.lb.style.lineHeight = "18px";
    this.u.style.width = "60px";
    this.m.style.width = "30px";
    this.l.style.width = "30px";
    this.I.style.width = "40px";
    this.V = L("a", this.lb, null, "buyButton");
    this.V.href = "#";
    this.V.style.minWidth = "75px";
    this.V.onclick = function() {
        return ! 1
    };
    b && (this.lb.className = "alt", this.m.className = "alt");
    this.u.className = X(b, E);
    this.l.className = W(b, !1);
    this.I.className = W(b, !0)
};
function zc(a, b) {
    this.ua = a;
    this.I = this.l = this.m = this.u = this.V = this.lb = this.D = null;
    this.Ra = -1E5;
    this.Pa(b);
    this.xa = E;
    this.gb = this.Gb = !1
}
zc.prototype = new V;
zc.prototype.wc = function(a, b) {
    var c = A.a.R[a.H],
    d = c.Aa[a.w],
    f = d ? d.j: 0,
    d = a.j > f,
    f = a.j - f,
    g = 0 != this.ua % 2,
    h = a.Ha();
    b && (this.D.innerHTML = vc(a.w, a.tb), this.V.innerHTML = a.H, this.u.innerHTML = uc(a), this.m.innerHTML = w(a.ub), this.l.innerHTML = w(a.j), this.Gb = !d, this.xa = null, this.gb = !d);
    d !== this.Gb && ((this.Gb = d) ? (this.V.className = "buyButton", this.V.onclick = function() {
        F(c, a);
        A.a.Va.removeItem(a);
        G(c);
        return ! 1
    }) : (this.V.className = "disabledBuyButton", this.V.onclick = function() {
        return ! 1
    }));
    h != this.xa && (this.xa = h, this.u.className = X(g, h));
    d != this.gb && (this.gb = d, this.l.className = W(g, d));
    this.Ra !== f && (this.I.innerHTML = w(f), this.I.className = W(g, 0 < f), this.Ra = f)
};
zc.prototype.Pa = function(a) {
    var b = 0 != this.ua % 2;
    this.D = a.insertCell(0);
    this.D.className = b ? "firstColAlt": "firstCol";
    this.lb = a.insertCell(1);
    this.u = a.insertCell(2);
    this.m = a.insertCell(3);
    this.l = a.insertCell(4);
    this.I = a.insertCell(5);
    this.lb.style.width = "75px";
    this.lb.style.lineHeight = "18px";
    this.u.style.width = "60px";
    this.m.style.width = "30px";
    this.l.style.width = "30px";
    this.I.style.width = "40px";
    this.V = L("a", this.lb, null, "buyButton");
    this.V.href = "#";
    this.V.style.minWidth = "75px";
    this.V.onclick = function() {
        return ! 1
    };
    b && (this.lb.className = "alt", this.m.className = "alt");
    this.u.className = X(b, E);
    this.l.className = W(b, !1);
    this.I.className = W(b, !0)
};
function Ac() {
    this.b = "item_drop_container";
    this.C = "item_drop_table";
    this.sa = [];
    this.Gd = [];
    this.table = null;
    this.lg = 6;
    this.$c = -1
}
e = Ac.prototype;
e.f = function() {};
e.g = function() {
    var a = A.a.nb.items,
    b, c;
    this.table || (this.ba(), R(this.b));
    if (this.$c !== a.length) {
        N(this.table, !0);
        this.sa.length = 0;
        this.Gd.length = 0;
        this.$c = a.length;
        for (c = 0; c < a.length; c++) b = this.table.insertRow(c + 1),
        this.sa.push(a[c]),
        this.Gd.push(new yc(c, b));
        for (c = a.length; c < this.lg; c++) this.de(c + 1)
    }
    for (c = 0; c < this.Gd.length; c++) this.Gd[c].g(a[c])
};
e.de = function(a) {
    var b = this.table.insertRow(a);
    a = 0 != (a + 1) % 2;
    var c = b.insertCell(0),
    d = b.insertCell(1),
    f = b.insertCell(2),
    g = b.insertCell(3),
    h = b.insertCell(4),
    b = b.insertCell(4);
    c.className = a ? "firstColAlt": "firstCol";
    a && (d.className = "alt", f.className = "alt", g.className = "alt", h.className = "alt", b.className = "alt");
    c.innerHTML = "&nbsp;";
    d.innerHTML = "&nbsp;";
    f.innerHTML = "&nbsp;";
    g.innerHTML = "&nbsp;";
    h.innerHTML = "&nbsp;";
    b.innerHTML = "&nbsp;";
    d.style.width = "80px";
    d.style.lineHeight = "21px";
    f.style.width = "60px";
    g.style.width = "30px";
    h.style.width = "30px";
    b.style.width = "40px"
};
e.ba = function() {
    var a = K(this.b);
    this.table = K(this.C);
    this.table || (this.table = L("table", a, this.C, "cleanTable"));
    var a = this.table.insertRow(0),
    b = T(a, "noBackground");
    this.qe(b);
    T(a, null).innerHTML = "装备";
    T(a, null).innerHTML = "品质";
    T(a, null).innerHTML = "等级";
    T(a, null).innerHTML = "CPS";
    T(a, null).innerHTML = "\u0394CPS"
};
e.qe = function(a) {
    var b = L("table", a, null, null),
    c = b.insertRow(0),
    d = c.insertCell(0),
    c = c.insertCell(1);
    a.style.padding = 0;
    b.style.width = "100%";
    d.innerHTML = "近期掉落道具";
    d.className = "clearCell";
    d.style.verticalAlign = "bottom";
    d.style.textAlign = "left";
    c.className = "clearCell";
    c.style.verticalAlign = "bottom";
    c.style.textAlign = "right";
    a = L("a", c, null, "buyButton");
    a.href = "#";
    a.title = "清除所有垃圾道具,装备所有好的道具.";
    a.style.minWidth = "95px";
    a.style.fontWeight = "normal";
    a.innerHTML = "装备 / 清除";
    a.onclick = function() {
        Ba(A.a.nb);
        for (var a, b; 0 !== A.a.nb.items.length;) a = A.a.nb.items[0],
        Ca(a) ? (b = A.a.R[a.H], F(b, a), A.a.nb.removeItem(a), G(b)) : A.a.nb.removeItem(a);
        return ! 1
    }
};
function Bc() {
    this.b = "item_cache_container";
    this.C = "item_cache_table";
    this.sa = [];
    this.zd = [];
    this.table = null;
    this.$c = -1
}
e = Bc.prototype;
e.f = function() {};
e.g = function() {
    var a = A.a.Va.items,
    b, c;
    this.table || (this.ba(), R(this.b));
    if (this.$c !== a.length) {
        N(this.table, !0);
        this.sa.length = 0;
        this.zd.length = 0;
        this.$c = a.length;
        for (c = 0; c < a.length; c++) b = this.table.insertRow(c + 1),
        this.sa.push(a[c]),
        this.zd.push(new zc(c, b));
        b = Fa + A.a.P.ja * Ga;
        for (c = a.length; c < b; c++) this.de(c + 1)
    }
    for (c = 0; c < this.zd.length; c++) this.zd[c].g(a[c])
};
e.de = function(a) {
    var b = this.table.insertRow(a);
    a = 0 != (a + 1) % 2;
    var c = b.insertCell(0),
    d = b.insertCell(1),
    f = b.insertCell(2),
    g = b.insertCell(3),
    h = b.insertCell(4),
    b = b.insertCell(5);
    c.className = a ? "firstColAlt": "firstCol";
    a && (d.className = "alt", f.className = "alt", g.className = "alt", h.className = "alt", b.className = "alt");
    c.innerHTML = "&nbsp;";
    d.innerHTML = "&nbsp;";
    f.innerHTML = "&nbsp;";
    g.innerHTML = "&nbsp;";
    h.innerHTML = "&nbsp;";
    b.innerHTML = "&nbsp;";
    d.style.width = "80px";
    d.style.lineHeight = "21px";
    f.style.width = "60px";
    g.style.width = "30px";
    h.style.width = "30px";
    b.style.width = "40px"
};
e.ba = function() {
    var a = K(this.b);
    this.table = K(this.C);
    this.table || (this.table = L("table", a, this.C, "cleanTable"));
    var a = this.table.insertRow(0),
    b = T(a, "noBackground");
    this.qe(b);
    T(a, null).innerHTML = "装备";
    T(a, null).innerHTML = "品质";
    T(a, null).innerHTML = "等级";
    T(a, null).innerHTML = "CPS";
    T(a, null).innerHTML = "\u0394CPS"
};
e.qe = function(a) {
    var b = L("table", a, null, null),
    c = b.insertRow(0),
    d = c.insertCell(0),
    c = c.insertCell(1);
    a.style.padding = 0;
    b.style.width = "100%";
    d.innerHTML = "缓存道具";
    d.className = "clearCell";
    d.style.verticalAlign = "bottom";
    d.style.textAlign = "left";
    c.className = "clearCell";
    c.style.verticalAlign = "bottom";
    c.style.textAlign = "right";
    a = L("a", c, null, "buyButton");
    a.href = "#";
    a.title = "装备所有缓存道具";
    a.style.minWidth = "95px";
    a.style.fontWeight = "normal";
    a.innerHTML = "装备所有";
    a.onclick = function() {
        for (var a, b; 0 !== A.a.Va.items.length;) a = A.a.Va.items[0],
        Ca(a) ? (b = A.a.R[a.H], F(b, a), A.a.Va.removeItem(a), G(b)) : A.a.Va.removeItem(a);
        return ! 1
    }
};
function Cc(a, b, c) {
    this.ua = b;
    this.r = a;
    this.l = this.m = this.u = this.Gf = this.Mf = this.D = null;
    this.Pa(c);
    this.Fd = null;
    this.xa = E
}
Cc.prototype = new V;
Cc.prototype.wc = function(a, b) {
    b && (this.Mf.innerHTML = vc(a.w, a.tb), this.u.innerHTML = uc(a), this.m.innerHTML = w(a.ub), this.l.innerHTML = w(a.j));
    var c = a.Ha();
    if (b || c != this.xa) this.xa = c,
    this.u.className = X(0 != this.ua % 2, c)
};
Cc.prototype.Pa = function(a) {
    var b = 0 != this.ua % 2;
    this.D = a.insertCell(0);
    this.D.className = b ? "firstColAlt": "firstCol";
    this.Gf = L("div", this.D, null, "hoveredIndicator");
    this.Gf.innerHTML = "&#149;";
    this.Mf = L("span", this.D, null, null);
    this.u = a.insertCell(1);
    this.m = a.insertCell(2);
    this.l = a.insertCell(3);
    this.u.style.width = "60px";
    this.m.style.width = "30px";
    this.l.style.width = "30px";
    b && (this.m.className = "alt", this.l.className = "alt");
    this.u.className = X(b, E)
};
function Dc(a) {
    this.r = a;
    this.b = "char" + a + "_inventory_container";
    this.C = "char" + a + "_inventory_table";
    this.Lc = !1;
    this.sa = [];
    this.Xc = [];
    this.table = null
}
Dc.prototype.f = function() {};
Dc.prototype.g = function() {
    var a = A.a.c[this.r],
    b;
    if (a) if (lc()) this.Lc && (Q(this.b), this.Lc = !1);
    else {
        var c = a.items;
        if (c && 0 !== c.length) {
            this.Lc || (R(this.b), this.Lc = !0);
            this.table || this.ba();
            if (this.sa.length !== c.length) for (this.table && N(this.table, !0), this.sa.length = 0, b = this.Xc.length = 0; b < c.length; b++) a = this.table.insertRow(b + 1),
            this.sa.push(c[b]),
            this.Xc.push(new Cc(this.r, b, a));
            for (b = 0; b < this.Xc.length; b++) this.Xc[b].g(c[b])
        } else this.table && 1 < this.table.rows.length && N(this.table, !0),
        this.Lc && (Q(this.b), this.Lc = !1),
        this.sa.length = 0,
        this.Xc.length = 0
    }
};
Dc.prototype.ba = function() {
    var a = K(this.b);
    this.table = K(this.C);
    this.table || (this.table = L("table", a, this.C, "cleanTable"));
    a = this.table.insertRow(0);
    T(a, "noBackground").innerHTML = "当前背包";
    T(a, null).innerHTML = "品质";
    T(a, null).innerHTML = "等级";
    T(a, null).innerHTML = "CPS"
};
function Ec(a, b, c) {
    this.ua = b;
    this.r = a;
    this.I = this.l = this.m = this.u = this.la = this.ib = this.D = null;
    this.Ra = -1E5;
    this.Pa(c);
    this.gb = this.Qd = this.wd = !1;
    this.xa = E
}
Ec.prototype = new V;
Ec.prototype.wc = function(a, b) {
    var c = A.a.c[this.r];
    if (c) {
        var d = c.Aa[a.w],
        c = A.a.M.ya >= a.ca,
        f = d ? d.j: 0,
        d = a.j > f,
        f = a.j - f,
        g = c && d,
        h = a.Ha(),
        l = 0 != this.ua % 2,
        k = this.r;
        b && (this.D.innerHTML = vc(a.w, a.tb), this.la.innerHTML = "$" + w(a.ca), this.u.innerHTML = uc(a), this.m.innerHTML = w(a.ub), this.l.innerHTML = w(a.j));
        b && (this.Qd = !g, this.wd = !c, this.gb = !d, this.xa = null);
        g != this.Qd ? (this.Qd = g, this.wd = c, this.Qd ? (this.la.className = "buyButton", this.la.onclick = function() {
            Fc(k, a);
            return ! 1
        }) : (this.la.className = c ? "disabledBuyButton": "unaffordableBuyButton", this.la.onclick = function() {
            return ! 1
        })) : g || c == this.wd || (this.wd = c, this.la.className = c ? "disabledBuyButton": "unaffordableBuyButton");
        h != this.xa && (this.xa = h, this.u.className = X(l, h));
        d != this.gb && (this.gb = d, this.l.className = W(l, d));
        this.Ra !== f && (this.I.innerHTML = w(f), this.I.className = W(l, 0 < f), this.Ra = f)
    }
};
Ec.prototype.Pa = function(a) {
    var b = 0 != this.ua % 2;
    this.D = a.insertCell(0);
    this.D.className = b ? "firstColAlt": "firstCol";
    this.ib = a.insertCell(1);
    this.u = a.insertCell(2);
    this.m = a.insertCell(3);
    this.l = a.insertCell(4);
    this.I = a.insertCell(5);
    this.ib.style.width = "50px";
    this.u.style.width = "60px";
    this.m.style.width = "30px";
    this.l.style.width = "30px";
    this.I.style.width = "40px";
    this.la = L("a", this.ib, null, "buyButton");
    this.la.href = "#";
    this.la.onclick = function() {
        return ! 1
    };
    b && (this.ib.className = "alt", this.m.className = "alt");
    this.u.className = X(b, E);
    this.l.className = W(b, !1);
    this.I.className = W(b, !0)
};
function Gc(a) {
    this.r = a;
    this.b = "char" + a + "_store_container";
    this.C = "char" + a + "_shop_table";
    this.Vc = "char" + a + "_shop_caption";
    this.Ma = !1;
    this.sa = [];
    this.Yc = [];
    this.caption = this.table = null;
    this.nc = this.mc = -1
}
Gc.prototype.f = function() {
    A.a.c.length > this.r && this.ba();
    this.nc = this.mc = -1
};
Gc.prototype.g = function() {
    var a = A.a.c[this.r],
    b;
    if (a) if (lc()) this.Ma && (Q(this.b), this.Ma = !1);
    else {
        var c = A.a.Y.uc[a.O];
        if (c && 0 !== c.length) {
            this.Ma || (R(this.b), this.Ma = !0);
            if (this.sa.length !== c.length) for (this.table && N(this.table, !0), this.sa.length = 0, b = this.Yc.length = 0; b < c.length; b++) a = this.table.insertRow(b + 1),
            this.sa.push(c[b]),
            this.Yc.push(new Ec(this.r, b, a));
            for (b = 0; b < this.Yc.length; b++) this.Yc[b].g(c[b])
        } else this.table && 1 < this.table.rows.length && N(this.table, !0),
        this.Ma && (Q(this.b), this.Ma = !1),
        this.sa.length = 0,
        this.Yc.length = 0;
        a = A.a.Y.Zd;
        b = A.a.Y.$d;
        if (a != this.mc || b != this.nc) this.mc = a,
        this.nc = b,
        this.caption.innerHTML = 1 === a ? "商店货源补充在" + a + "分钟" + b + "秒后": 0 < a ? "商店货源补充在" + a + "分钟" + b + "秒后": "商店货源补充在" + b + "秒后"
    }
};
Gc.prototype.ba = function() {
    if (A.a.c[this.r]) {
        var a = K(this.b); (this.table = K(this.C)) ? N(this.table, !1) : this.table = L("table", a, this.C, "cleanTable");
        this.caption = K(this.Vc);
        this.caption || (this.caption = L("caption", this.table, this.Vc, null));
        var a = this.table.insertRow(0),
        b = T(a, "noBackground");
        this.oe(b);
        T(a, null).innerHTML = "购买";
        T(a, null).innerHTML = "品质";
        T(a, null).innerHTML = "等级";
        T(a, null).innerHTML = "CPS";
        T(a, null).innerHTML = "\u0394CPS"
    }
};
Gc.prototype.oe = function(a) {
    var b = A.a.c[this.r],
    c = L("table", a, null, null),
    d = c.insertRow(0),
    f = d.insertCell(0),
    d = d.insertCell(1);
    a.style.padding = 0;
    c.style.width = "100%";
    f.innerHTML = b.O.toUpperCase() + "道具商店";
    f.className = "clearCell";
    f.style.verticalAlign = "bottom";
    f.style.textAlign = "left";
    d.className = "clearCell";
    d.style.verticalAlign = "bottom";
    d.style.textAlign = "right";
    a = L("a", d, null, "buyButton");
    a.href = "#";
    a.title = "尽可能多的购买道具,根据最好价值排序(\u0394CPS / 价值).";
    a.style.minWidth = "85px";
    a.style.fontWeight = "normal";
    a.innerHTML = "购买所有";
    a.onclick = function() {
        Hc(A.a.Y.uc[b.O]);
        return ! 1
    }
};
function Ic(a) {
    this.r = a;
    this.b = "char" + a + "_statistics_container";
    this.C = "char" + a + "_statistics_table";
    this.ae = !1;
    this.Hb = this.Nf = this.Ic = this.l = this.m = this.Kc = this.table = null;
    this.rb = this.we = this.Ec = this.ve = this.Db = this.oc = -1
}
Ic.prototype.f = function() {
    A.a.c.length > this.r && this.ba()
};
Ic.prototype.g = function() {
    if (0 !== A.a.c.length) {
        var a = A.a.c[this.r];
        if (a) if (lc()) this.ae && (Q(this.b), this.ae = !1);
        else {
            this.ae || (R(this.b), this.ae = !0);
            var b = A.a.M.ya;
            this.oc != b && (this.oc = b, this.Kc.innerHTML = w(this.oc));
            this.Db != a.ra && (this.Db = a.ra, this.m.innerHTML = w(this.Db));
            this.ve != ra(a) && (this.ve = ra(a), this.l.innerHTML = w(this.ve));
            this.Ec != a.Fa && (this.Ec = a.Fa, this.Ic.innerHTML = w(this.Ec));
            b = a.Fb - a.Fa;
            this.we != b && (this.we = b, this.Nf.innerHTML = w(this.we));
            this.rb != a.Bc && (this.rb = a.Bc, this.Hb.innerHTML = w(this.rb))
        }
    }
};
Ic.prototype.ba = function() {
    var a = A.a.c[this.r];
    if (a) {
        var b = K(this.b); (this.table = K(this.C)) ? N(this.table, !1) : this.table = L("table", b, this.C, "cleanTable");
        var c = this.table.insertRow(0),
        b = this.table.insertRow(1);
        T(c, "noBackground").innerHTML = "统计资料";
        var d = T(c, null);
        d.innerHTML = "队伍黄金";
        d.title = "从敌人的尸体上获取黄金.黄金可以用来购买道具,所以尽可能多的制造尸体吧.";
        T(c, null).innerHTML = "等级";
        T(c, null).innerHTML = "CPS";
        d = T(c, null);
        d.innerHTML = "经验";
        d.title = "这个数字代表了在该角色成长过程中,许多可怜的人贡献了生命.";
        d = T(c, null);
        d.innerHTML = "需要经验";
        d.title = "经验需要达到该数值才能进行升级.";
        c = T(c, null);
        c.innerHTML = "杀戮";
        c.title = "这数字代表了该角色杀害了多少生命.他们大部分都是好人,只是想交个朋友.他们也有家人.";
        c = b.insertCell(0);
        c.className = "firstCol";
        c.innerHTML = a.O;
        this.Kc = b.insertCell(1);
        this.m = b.insertCell(2);
        this.l = b.insertCell(3);
        this.Ic = b.insertCell(4);
        this.Nf = b.insertCell(5);
        this.Hb = b.insertCell(6)
    }
};
function Jc(a) {
    this.r = a;
    this.b = "char" + a + "_ability_container";
    this.C = "char" + a + "_abilities_table";
    this.table = null;
    this.cb = this.zb = this.ob = !1;
    this.Tb = -1;
    this.jc = this.td = null
}
e = Jc.prototype;
e.f = function() {
    A.a.c[this.r] && (this.cb = this.zb = !1, this.jc = this.td = null, this.Tb = -1, this.ba())
};
e.g = function() {
    var a = A.a.c[this.r];
    if (a) {
        var b = this.r === A.input.pa;
        this.ob !== b && ((this.ob = b) ? R(this.b) : Q(this.b));
        if (b) {
            a = a.Ea;
            a.N != this.zb ? (this.zb = a.N, this.cb = a.G, a.N ? (O(this.jc), P(this.td)) : (this.jc.className = a.G ? "activeCharacterAbilityTableButton": "disabledCharacterAbilityTableButton", P(this.jc), O(this.td))) : a.G != this.cb && (this.cb = a.G, this.jc.className = a.G ? "activeCharacterAbilityTableButton": "disabledCharacterAbilityTableButton");
            var c, b = p();
            a.N || (c = a.G ? Math.max(0, a.qb - b) / 1E3: Rb(a, b) / 1E3, b = q(c % 60), this.Tb !== b && (this.Tb = b, c = q(c / 60), this.jc.innerHTML = 10 > b ? a.Ua() + " (" + c + ":0" + b + ")": a.Ua() + " (" + c + ":" + b + ")"))
        }
    }
};
e.ba = function() {
    var a = A.a.c[this.r];
    if (a) {
        var b = K(this.b); (this.table = K(this.C)) ? N(this.table, !1) : this.table = L("table", b, this.C, "cleanTable");
        b = this.table.insertRow(0);
        T(b, "noBackground").innerHTML = "角色能力";
        T(b, null).innerHTML = "描述";
        this.me(this.table.insertRow(1), 0, a.Ea)
    }
};
e.me = function(a, b, c) {
    b = 0 != b % 2;
    var d = a.insertCell(0);
    a = a.insertCell(1);
    d.className = b ? "firstColAlt": "firstCol";
    d.style.width = "220px";
    b && (a.className = "alt");
    this.td = this.ne(d, c);
    this.jc = this.pe(d, c);
    a.innerHTML = c.cd();
    this.zb = c.N;
    this.cb = c.G
};
e.ne = function(a, b) {
    var c = L("a", a, null, "characterAbilityTableButton");
    c.innerHTML = b.Ua();
    c.onclick = function() {
        Ub(b)
    };
    b.N ? P(c) : O(c);
    return c
};
e.pe = function(a, b) {
    var c = L("a", a, null, b.G ? "activeCharacterAbilityTableButton": "disabledCharacterAbilityTableButton");
    c.innerHTML = "在这里进行倒计时";
    b.N ? O(c) : P(c);
    return c
};
function Kc(a) {
    this.r = a;
    this.mg = "char" + a + "_level";
    this.lf = "char" + this.r + "_name";
    this.Gc = "";
    this.Db = -1;
    this.b = "char" + a + "_section";
    this.ob = !0;
    this.mf = new Jc(a);
    this.pf = new Ic(a);
    this.of = new Dc(a);
    this.rf = new Gc(a)
}
Kc.prototype.f = function() {
    var a = A.a.c[this.r];
    a ? (S("tabLink" + this.r, a.O), S(this.lf, a.wa), this.Gc = a.wa, R("tabChar" + this.r)) : Q("tabChar" + this.r);
    this.mf.f();
    this.pf.f();
    this.of.f();
    this.rf.f()
};
Kc.prototype.g = function() {
    var a = this.r === A.input.pa;
    this.ob !== a && ((this.ob = a) ? R(this.b) : Q(this.b));
    var b = A.a.c[this.r];
    b && (a && (a = b.ra, a !== this.Db && (S(this.mg, "等级 " + a + " " + b.O), this.Db = a)), a = b.wa, this.Gc !== a && (S(this.lf, b.wa), this.Gc = a), this.mf.g(), this.pf.g(), this.of.g(), this.rf.g())
};
function Lc() {
    this.b = "party_section";
    this.ob = !1;
    this.Rf = new Mc;
    this.$b = new Nc;
    this.Uf = new wc
}
Lc.prototype.f = function() {
    this.Rf.f();
    this.$b.f();
    this.Uf.f()
};
Lc.prototype.g = function() {
    var a = lc();
    this.ob !== a && ((this.ob = a) ? R(this.b) : Q(this.b));
    a && (this.Rf.g(), this.Uf.g(), this.$b.g())
};
function Mc() {
    this.b = "party_abilities_container";
    this.C = "party_abilities_table";
    this.table = null;
    this.ob = !1;
    this.bb = -1;
    this.zb = [];
    this.cb = [];
    this.Tb = [];
    this.ud = [];
    this.kc = []
}
e = Mc.prototype;
e.f = function() {
    this.zb.length = 0;
    this.cb.length = 0;
    this.ud.length = 0;
    this.kc.length = 0;
    this.Tb.length = 0;
    this.ba();
    var a;
    for (a = 0; a < A.a.c.length; a++) this.Tb[a] = -1;
    this.bb = -1
};
e.g = function() {
    var a = lc();
    this.ob !== a && ((this.ob = a) ? R(this.b) : Q(this.b));
    if (a) {
        var b, a = A.jb.bb;
        if (a != this.bb) for (this.bb = a, a = 0; a < A.a.c.length; a++) b = A.a.c[a].Ea,
        b.N != this.zb[a] ? (this.zb[a] = b.N, this.cb[a] = b.G, b.N ? (O(this.kc[a]), P(this.ud[a])) : (this.kc[a].className = b.G ? "activeCharacterAbilityTableButton": "disabledCharacterAbilityTableButton", P(this.kc[a]), O(this.ud[a]))) : b.G != this.cb[a] && (this.cb[a] = b.G, this.kc[a].className = b.G ? "activeCharacterAbilityTableButton": "disabledCharacterAbilityTableButton");
        for (var c, d, f = p(), a = 0; a < A.a.c.length; a++) b = A.a.c[a].Ea,
        b.N || (c = b.G ? Math.max(0, b.qb - f) / 1E3: Rb(b, f) / 1E3, d = q(c % 60), this.Tb[a] !== d && (this.Tb[a] = d, c = q(c / 60), this.kc[a].innerHTML = 10 > d ? b.Ua() + " (" + c + ":0" + d + ")": b.Ua() + " (" + c + ":" + d + ")"))
    }
};
e.ba = function() {
    var a = K(this.b); (this.table = K(this.C)) ? N(this.table, !1) : this.table = L("table", a, this.C, "cleanTable");
    var a = this.table.insertRow(0),
    b = T(a, "noBackground");
    Oc(b);
    T(a, null).innerHTML = "描述";
    for (a = 0; a < A.a.c.length; a++) this.me(this.table.insertRow(a + 1), a, A.a.c[a].Ea)
};
function Oc(a) {
    var b = L("table", a, null, null),
    c = b.insertRow(0),
    d = c.insertCell(0),
    c = c.insertCell(1);
    a.style.padding = 0;
    b.style.width = "100%";
    d.innerHTML = "角色能力";
    d.className = "clearCell";
    d.style.verticalAlign = "bottom";
    d.style.textAlign = "left";
    c.className = "clearCell";
    c.style.verticalAlign = "bottom";
    c.style.textAlign = "right";
    a = L("a", c, null, "buyButton");
    a.href = "#";
    a.title = "激活所有角色的能力";
    a.style.minWidth = "65px";
    a.style.fontWeight = "normal";
    a.innerHTML = "全部";
    a.onclick = function() {
        var a, b, c = null,
        d = null;
        for (a = 0; a < A.a.c.length; a++) b = A.a.c[a].Ea,
        b.N && (b.Ua() === Zb ? c = b: b.Ua() === dc ? d = b: Ub(b));
        c && Ub(c);
        d && (a = A.a.aa, b = A.a.Eb, a.Da || a.Na || null !== b.fc || Ub(d));
        return ! 1
    }
}
e.me = function(a, b, c) {
    var d = 0 != b % 2,
    f = a.insertCell(0);
    a = a.insertCell(1);
    f.className = d ? "firstColAlt": "firstCol";
    f.style.width = "220px";
    d && (a.className = "alt");
    this.ud[b] = this.ne(f, c);
    this.kc[b] = this.pe(f, c);
    a.innerHTML = c.cd();
    this.zb[b] = c.N;
    this.cb[b] = c.G
};
e.ne = function(a, b) {
    var c = L("a", a, null, "characterAbilityTableButton");
    c.innerHTML = b.Ua();
    c.onclick = function() {
        Ub(b)
    };
    b.N ? P(c) : O(c);
    return c
};
e.pe = function(a, b) {
    var c = L("a", a, null, b.G ? "activeCharacterAbilityTableButton": "disabledCharacterAbilityTableButton");
    c.innerHTML = "在这里进行倒计时";
    b.N ? O(c) : P(c);
    return c
};
function Pc(a, b, c) {
    this.ua = b;
    this.$b = a;
    this.X = null;
    this.item = c;
    this.I = this.l = this.m = this.u = this.Ac = this.la = this.ib = this.D = null;
    this.Ra = -1E4;
    this.Fc = !1
}
Pc.prototype = new V;
Pc.prototype.wc = function(a, b) {
    if (this.X) {
        var c = A.a.R[a.H],
        d = c ? c.Aa[a.w] : null,
        f = d ? d.j: 0,
        d = a.j > f,
        f = a.j - f,
        g = 0 != (this.X.rowIndex - 1) % 2,
        h = a.Ha();
        if (!d) Qc(this.$b, this);
        else if (b) {
            this.D.innerHTML = vc(a.w, a.tb);
            this.la.innerHTML = "$" + w(a.ca);
            this.Ac.innerHTML = a.H;
            this.u.innerHTML = uc(a);
            this.m.innerHTML = w(a.ub);
            this.l.innerHTML = w(a.j);
            this.I.innerHTML = w(f);
            this.Ra = f;
            var l = this;
            this.la.className = "buyButton";
            this.la.onclick = function() {
                Fc(A.a.c.indexOf(c), a);
                Qc(l.$b, l);
                return ! 1
            };
            this.u.className = X(g, h);
            this.l.className = W(g, d);
            this.I.className = W(g, 0 < f)
        }
    }
};
Pc.prototype.Pa = function(a) {
    var b = 0 != (a.rowIndex - 1) % 2;
    this.D = a.insertCell(0);
    this.D.className = b ? "firstColAlt": "firstCol";
    this.ib = a.insertCell(1);
    this.Ac = a.insertCell(2);
    this.u = a.insertCell(3);
    this.m = a.insertCell(4);
    this.l = a.insertCell(5);
    this.I = a.insertCell(6);
    this.D.style.width = "250px";
    this.ib.style.width = "50px";
    this.Ac.style.width = "60px";
    this.u.style.width = "60px";
    this.m.style.width = "30px";
    this.l.style.width = "30px";
    this.I.style.width = "40px";
    this.la = L("a", this.ib, null, "buyButton");
    this.la.href = "#";
    this.la.onclick = function() {
        return ! 1
    };
    b && (this.ib.className = "alt", this.Ac.className = "alt", this.m.className = "alt");
    this.u.className = X(b, E);
    this.l.className = W(b, !1);
    this.I.className = W(b, !0)
};
function Nc() {
    this.b = "party_store_container";
    this.C = "party_shop_table";
    this.Of = "party_shop_no_items";
    this.Vc = "party_shop_table_caption";
    this.Xf = null;
    this.h = this.Ma = !1;
    this.Ja = [];
    this.caption = this.$a = this.table = null;
    this.vb = this.nc = this.mc = -1
}
Nc.prototype.f = function() {
    this.ba();
    var a = K(this.b);
    this.$a = K(this.Of);
    if (!this.$a) {
        this.$a = L("div", a, this.Of, null);
        this.$a.style.marginTop = "15px";
        var a = L("div", this.$a, null, "sectionTitle"),
        b = L("div", this.$a, null, null);
        this.Xf = L("div", this.$a, null, null);
        a.innerHTML = "可买的商店道具";
        b.innerHTML = "目前有在店里没有可购买的道具."
    }
    O(this.table);
    P(this.$a);
    this.Ma = !1;
    this.Ja.length = 0;
    Q(this.b);
    this.h = !1;
    this.vb = this.nc = this.mc = -1
};
Nc.prototype.g = function() {
    var a = lc();
    this.h !== a && ((this.h = a) ? R(this.b) : Q(this.b));
    if (a && 0 !== A.a.c.length) {
        var b = A.a.Y.items,
        a = A.a.Y.vb;
        if (this.vb !== a) {
            this.vb = a;
            N(this.table, !0);
            for (a = this.Ja.length = 0; a < b.length; a++) {
                var c = b[a],
                d = A.a.R[c.H].Aa[c.w]; (!d || c.j > d.j) && this.Ja.push(new Pc(this, a, b[a]))
            }
            0 === this.Ja.length && (O(this.table), P(this.$a), this.Ma = !1)
        }
        a = 0;
        for (b = !1; a < this.Ja.length;) {
            c = this.Ja[a];
            if (d = A.a.R[c.item.H]) {
                var f = d.Aa[c.item.w],
                d = f ? f.j: 0,
                g = A.a.M.ya >= c.item.ca,
                h = !f || c.item.j > d;
                if (f !== c.item && h) {
                    f = 0;
                    if (g && !c.Fc) {
                        b: {
                            for (var g = c.$b,
                            h = c,
                            l = h.ua,
                            k = void 0,
                            s = void 0,
                            f = void 0,
                            k = 0; k < g.Ja.length; k++) if (s = g.Ja[k], s !== h && (f = s.X) && l < s.ua) {
                                g = g.table.insertRow(f.rowIndex); (h.X = g) && h.Pa(g);
                                break b
                            }
                            f = h;
                            g = g.table.insertRow(g.table.rows.length); (f.X = g) && f.Pa(g)
                        }
                        c.Fc = !0;
                        c.wc(c.item, !0);
                        f = 1
                    } else if (!g && c.Fc) {
                        g = c;
                        if (f = g.X) c.$b.table.deleteRow(f.rowIndex),
                        g.X = null;
                        c.Fc = !1;
                        f = 1
                    }
                    c.Fc && (d = c.item.j - d, c.Ra !== d && (c.I.innerHTML = w(d), c.I.className = W(0 != (c.X.rowIndex - 1) % 2, 0 < d), c.Ra = d));
                    c = f
                } else c.Fc = !1,
                Qc(c.$b, c),
                c = -1
            } else c = 0; - 1 !== c && a++;
            0 !== c && (b = !0)
        }
        if (b) for (a = 0; a < this.Ja.length; a++) b = this.Ja[a],
        b.X && (c = 0 != (b.X.rowIndex - 1) % 2, b.D.className = c ? "firstColAlt": "firstCol", c ? (b.ib.className = "alt", b.Ac.className = "alt", b.m.className = "alt") : (b.ib.className = "", b.Ac.className = "", b.m.className = ""), b.u.className = X(c, b.item.Ha()), b.l.className = W(c, !0), b.I.className = W(c, !0));
        this.table || this.ba();
        a = this.table.rows && 1 < this.table.rows.length;
        if (this.Ma != a) if (this.Ma = a) {
            if (a = this.table) a.style.display = "table";
            O(this.$a)
        } else O(this.table),
        P(this.$a);
        a = A.a.Y.Zd;
        b = A.a.Y.$d;
        if (a != this.mc || b != this.nc) this.mc = a,
        this.nc = b,
        a = 1 === a ? "商店货源补充在" + a + "分钟 " + b + "秒后": 0 < a ? "商店货源补充在" + a + "分钟" + b + "秒后": "商店货源补充在" + b + "秒后",
        this.Ma ? this.caption.innerHTML = a: this.Xf.innerHTML = a
    }
};
Nc.prototype.ba = function() {
    var a = K(this.b); (this.table = K(this.C)) ? N(this.table, !1) : this.table = L("table", a, this.C, "cleanTable");
    this.caption = K(this.Vc);
    this.caption || (this.caption = L("caption", this.table, this.Vc, null));
    var b = this.table.insertRow(0),
    a = T(b, "noBackground"),
    c = T(b, null),
    d = T(b, null),
    f = T(b, null),
    g = T(b, null),
    h = T(b, null),
    b = T(b, null);
    a.style.width = "250px";
    c.style.width = "50px";
    d.style.width = "60px";
    f.style.width = "60px";
    g.style.width = "30px";
    h.style.width = "30px";
    b.style.width = "40px";
    this.oe(a);
    c.innerHTML = "购买";
    d.innerHTML = "角色";
    f.innerHTML = "品质";
    g.innerHTML = "等级";
    h.innerHTML = "CPS";
    b.innerHTML = "\u0394CPS"
};
Nc.prototype.oe = function(a) {
    var b = L("table", a, null, null),
    c = b.insertRow(0),
    d = c.insertCell(0),
    c = c.insertCell(1);
    a.style.padding = 0;
    b.style.width = "100%";
    d.innerHTML = "可购买道具";
    d.className = "clearCell";
    d.style.verticalAlign = "bottom";
    d.style.textAlign = "left";
    c.className = "clearCell";
    c.style.verticalAlign = "bottom";
    c.style.textAlign = "right";
    a = L("a", c, null, "buyButton");
    a.href = "#";
    a.title = "尽可能多的购买道具,根据最好价值排序(\u0394CPS / 价值).";
    a.style.minWidth = "85px";
    a.style.fontWeight = "normal";
    a.innerHTML = "购买所有";
    a.onclick = function() {
        Hc(A.a.Y.items);
        return ! 1
    }
};
function Qc(a, b) {
    var c = b.X;
    c && a.table.deleteRow(c.rowIndex);
    a.Ja.splice(a.Ja.indexOf(b), 1);
    0 === a.Ja.length && (O(a.table), P(a.$a), a.Ma = !1)
};
function Rc() {
    this.ye = this.Vb = -1;
    this.ge = !1;
    this.If = new Ac;
    this.Hf = new Bc
}
Rc.prototype.f = function() {
    this.ye = this.Vb = -1;
    this.ge = !1;
    this.Hf.f();
    this.If.f()
};
Rc.prototype.g = function() {
    var a = A.a.M.Vb,
    b;
    b = A.a.Eb.Ee;
    var c = A.a.Eb.fc,
    d = null !== c;
    d !== this.ge && (this.ge = d, c ? (Q("encounter_name"), c.Ve ? (R("boss_job_title_storyline"), Q("boss_job_title_non_storyline")) : (Q("boss_job_title_storyline"), R("boss_job_title_non_storyline")), R("boss_encounter_name")) : (R("encounter_name"), Q("boss_job_title_storyline"), Q("boss_job_title_non_storyline"), Q("boss_encounter_name")));
    this.Vb != a && (c ? (c.Ve ? S("boss_job_title_storyline", "剧情首领: " + c.rc()) : S("boss_job_title_non_storyline", "随机首领"), S("boss_encounter_name", A.a.Eb.Ce)) : S("encounter_name", A.a.Eb.Ce), this.Vb = a);
    this.ye != b && (K("encounter_progress").style.width = b + "%", this.ye = b);
    this.If.g();
    this.Hf.g()
};
function Sc() {
    this.b = "dungeon_container";
    this.gc = "next_level_button_container";
    this.nd = "dungeon_title_div";
    this.yf = -1;
    this.Od = !1
}
Sc.prototype.f = function() {
    this.La()
};
Sc.prototype.g = function() {
    var a = A.a.na.pc,
    b = A.a.na.Yb;
    this.yf !== a && (S(this.nd, "地下城等级 " + a + ": " + A.a.na.bd), this.yf = a);
    this.Od !== b && (b ? R(this.gc) : Q(this.gc), this.Od = b)
};
Sc.prototype.La = function() {
    var a = K(this.b);
    if (a) {
        M(this.b);
        L("div", a, this.nd, "sectionTitle").innerHTML = "地下城等级 " + A.a.na.pc;
        a = L("div", a, this.gc, null);
        a.style.textAlign = "center";
        a.style.margin = "0";
        A.a.na.Yb ? this.Od = !0 : (this.Od = !1, O(a));
        var b = L("div", a, null, null);
        b.style.marginTop = "10px";
        b.innerHTML = "在首领的尸体背后,你看到一个通往地下城下层的楼梯.";
        a = L("a", a, null, "dungeonStairsButton");
        a.title = "你敢在黑暗中前行吗?.";
        a.innerHTML = "前往下个等级";
        a.onclick = function() {
            var a = A.a.na;
            a.pc++;
            a.Yb = !1;
            a.bd = na(a.Ae);
            A.a.aa.Uc = p();
            y("Dungeon", "等级: " + A.a.na.pc);
            return ! 1
        }
    }
};
function Tc() {
    this.b = "boss_lair_container";
    this.gc = "enterBossLairButtonContainer";
    this.he = "bossLairNote";
    this.Na = this.Da = !1
}
Tc.prototype.f = function() {
    Q(this.b);
    this.Na = this.Da = !1;
    Uc(this)
};
Tc.prototype.g = function() {
    var a = A.a.aa.Da,
    b = A.a.aa.Na;
    this.Da !== a && ((this.Da = a) ? R(this.b) : Q(this.b));
    this.Na !== b && ((this.Na = b) ? (Q(this.gc), R(this.he)) : (R(this.gc), Q(this.he)))
};
function Uc(a) {
    var b = K(a.b);
    if (b) {
        M(a.b);
        L("div", b, null, "sectionTitle").innerHTML = "首领巢穴";
        var c = L("div", b, a.gc, null);
        c.style.textAlign = "center";
        c.style.margin = "0";
        var d = L("div", c, null, null);
        d.style.marginTop = "10px";
        d.innerHTML = "你从成群的小怪中艰难脱身,到达首领巢穴的入口处.";
        c = L("a", c, null, "bossLairButton");
        c.title = "进入屠杀和残虐的深渊.";
        c.innerHTML = "进入首领巢穴";
        c.onclick = function() {
            A.a.aa.Na = !0;
            return ! 1
        };
        a = L("div", b, a.he, null);
        a.style.marginTop = "10px";
        a.style.display = "none";
        a.innerHTML = "你将在完成这一次遭遇战后进入首领巢穴."
    }
};
function Vc() {
    this.b = "end_game_container";
    this.h = !1
}
Vc.prototype.f = function() {
    M(this.b);
    Q(this.b);
    this.h = !1
};
Vc.prototype.g = function() {
    var a = A.a.Sa.cc && !A.a.Sa.xc;
    this.h != a && ((this.h = a) ? (Wc(this), R("endGameDisabledBackground"), R(this.b)) : (Q("endGameDisabledBackground"), M(this.b), Q(this.b)))
};
function Wc(a) {
    var b = K(a.b);
    if (b) {
        M(a.b);
        L("div", b, null, "sectionTitle").innerHTML = "胜利!";
        a = L("div", b, null, null);
        a.style.marginTop = "10px";
        a.innerHTML = "你击败了所有的首领,推翻了抵抗组织,所以现在你可以在地下城内横行霸道(高效推图). ";
        a = L("div", b, null, null);
        a.style.marginTop = "10px";
        a.innerHTML = "无序和混乱造成的影响迟早会随着无尽兽潮的终结而终止,这仅仅是时间早晚的问题.";
        a = L("div", b, null, null);
        a.style.marginTop = "10px";
        a.innerHTML = "你可以通过'声望'重开你的游戏(带着加成重新开始)或继续在无尽的地下城进行冒险.";
        a = L("div", b, null, null);
        a.style.marginTop = "10px";
        a.appendChild(document.createTextNode("你将获得声望奖励:"));
        a = L("ul", a, null, null);
        L("li", a, null, null).innerHTML = "额外道具缓存槽.";
        L("li", a, null, null).innerHTML = "角色技能冷却加速.";
        L("li", a, null, null).innerHTML = "你开始保存一些你的上古神器.";
        L("li", a, null, null).innerHTML = "一点点CPS加成.";
        L("li", a, null, null).innerHTML = "你队伍中的角色将会获得冠军的荣耀.";
        a = L("div", b, null, null);
        a.style.marginTop = "10px";
        a.innerHTML = "如果你选择继续冒险,你可以在之后手动选择进行.新的'声望'按钮已经解锁,就在保存和重置按钮旁边.";
        var c = L("a", b, null, "prestigeButton"),
        d = L("div", b, null, null);
        c.innerHTML = "声望";
        c.onclick = function() {
            c.style.display = "none";
            d.style.display = "block";
            return ! 1
        };
        d.style.marginTop = "10px";
        d.style.display = "none";
        a = L("span", d, null, null);
        a.innerHTML = "你确定吗?这将会终结这次游戏并以全新的队伍开始新的游戏.你将再次找到'垃圾'道具.";
        a.style.fontWeight = "bold";
        a = L("a", d, null, "prestigeButton");
        a.innerHTML = "声望!";
        a.onclick = function() {
            Xc();
            return ! 1
        };
        b = L("a", b, null, "prestigeButton");
        b.innerHTML = "继续进行冒险";
        b.onclick = function() {
            A.a.Sa.xc = !0;
            return ! 1
        }
    }
};
function Yc() {
    this.b = "treasure_chest_container";
    this.Td = null;
    this.h = !1
}
Yc.prototype.f = function() {
    this.h = !1;
    this.La()
};
Yc.prototype.g = function() {
    var a = A.a.bc.ic;
    this.h !== a && ((this.h = a) ? R(this.b) : Q(this.b))
};
Yc.prototype.La = function() {
    var a = K(this.b);
    if (a) {
        M(this.b);
        L("div", a, null, "sectionTitle").innerHTML = "发现财宝箱!";
        var b = L("div", a, null, null);
        b.style.textAlign = "center";
        b.style.margin = "0";
        this.Td = L("a", b, null, "openTreasureChestButton");
        this.Td.title = "财宝箱里可能会有你想要的东西.";
        this.Td.innerHTML = "打开财宝箱";
        this.Td.onclick = function() {
            var a = Zc + r($c - Zc),
            b,
            f = D() + ad,
            g;
            for (g = 0; g < a; g++) b = A.a.c[r(A.a.c.length)],
            b = Ya(b, bd, f),
            Ia(b);
            a = A.a.bc;
            a.ic = !1;
            a.Dc = p();
            y("Treasure Chest", "Opened");
            return ! 1
        };
        O(a)
    }
};
function cd() {
    this.b = "quest_container";
    this.rd = this.Z = null;
    this.h = !1
}
cd.prototype.f = function() {
    this.La();
    this.h = !1;
    Q(this.b)
};
cd.prototype.g = function() {
    var a = pb(),
    b = null !== a;
    this.h !== b && (this.h = b, a ? (this.Z.innerHTML = "你遇到一个老人恳求你杀死<strong>" + a.Oc + "个" + a.Wa + "</strong>.他承诺给你一些好东西作为任务报酬.", R(this.b)) : Q(this.b))
};
cd.prototype.La = function() {
    var a = K(this.b);
    a && (M(this.b), L("div", a, null, "sectionTitle").innerHTML = "可接的任务", this.Z = L("div", a, null, null), this.Z.style.marginTop = "10px", this.Z.innerHTML = "", a = L("div", a, null, null), a.style.textAlign = "center", a.style.margin = "0", this.rd = L("a", a, null, "acceptQuestButton"), this.rd.title = "接受任务.干了.", this.rd.innerHTML = "接受任务", this.rd.onclick = function() {
        A.Fe.ce();
        return ! 1
    })
};
function dd() {
    this.b = "active_quests_container";
    this.h = !1;
    this.Qe = this.Oa = -1;
    this.ad = [];
    this.Rd = []
}
dd.prototype.f = function() {
    this.h = !1;
    this.Qe = this.Oa = -1;
    this.ad.length = 0;
    this.Rd.length = 0;
    M(this.b)
};
dd.prototype.g = function() {
    var a = A.a.S.Oa,
    b = qb().length;
    if (this.Oa !== a || this.Qe !== b) {
        this.Oa = a;
        this.Qe = b;
        var a = qb(),
        b = 0,
        c;
        for (c = 0; c < a.length; c++) a[c].wb || b++;
        if (0 === b) this.h = !1,
        M(this.b);
        else {
            if (a = K(this.b)) {
                this.Rd.length = 0;
                this.ad.length = 0;
                M(this.b);
                a = L("table", a, null, "cleanTable");
                c = a.insertRow(0);
                b = T(c, "firstColumn");
                c = T(c, null);
                b.innerHTML = "进行中的任务";
                c.innerHTML = "已杀死";
                for (var d, f, g = 1,
                h = qb(), b = 0; b < h.length; b++) c = h[b],
                c.wb || (d = a.insertRow(g), g++, f = d.insertCell(0), f.innerHTML = "杀死" + c.Oc + "个" + c.Wa, d = d.insertCell(1), d.innerHTML = c.Xb, this.Rd.push(d), this.ad.push(c.Xb), 0 == g % 2 ? f.className = "firstCol": (f.className = "firstColAlt", d.className = "alt"))
            }
            this.h || (this.h = !0, R(this.b))
        }
    } else for (a = qb(), g = b = 0; g < a.length; g++) a[g].wb || (c = a[g].Xb, f = this.ad[b], f !== c && (this.ad[b] = c, this.Rd[b].innerHTML = "" + c), b++)
};
function ed() {
    this.b = "completed_quests_container";
    this.h = !1;
    this.Oa = -1
}
ed.prototype.f = function() {
    this.h = !1;
    this.Oa = -1;
    M(this.b)
};
ed.prototype.g = function() {
    var a = A.a.S.Oa;
    if (this.Oa !== a) if (this.Oa = a, 0 === a) this.h = !1,
    M(this.b);
    else {
        if (a = K(this.b)) {
            M(this.b);
            var a = L("table", a, null, "cleanTable"),
            b = a.insertRow(0);
            T(b, "firstColumn").innerHTML = "已完成任务";
            for (var c = 1,
            d, f, g = qb(), b = 0; b < g.length; b++) d = g[b],
            d.wb && (f = a.insertRow(c), c++, f = f.insertCell(0), f.innerHTML = "杀死" + d.Oc + "个" + d.Wa, f.className = 0 == c % 2 ? "firstCol": "firstColAlt")
        }
        this.h || (this.h = !0, R(this.b))
    }
};
function fd() {
    this.b = "questsTabContainer";
    this.U = "questsTab";
    this.v = !1;
    this.vf = new ed;
    this.$e = new dd
}
fd.prototype.f = function() {
    this.v = !1;
    Q(this.U);
    Q(this.b);
    this.vf.f();
    this.$e.f()
};
fd.prototype.g = function() {
    0 === qb().length ? this.v && (this.v = !1, Q(this.U)) : this.v || (this.v = !0, R(this.U));
    this.v && (this.vf.g(), this.$e.g())
};
function gd() {
    this.b = "quest_complete_container";
    this.be = 0
}
gd.prototype.f = function() {
    M(this.b);
    this.be = 0;
    this.h = !1;
    Q(this.b)
};
gd.prototype.g = function() {
    var a = A.a.S.yb;
    this.be != a.length && (this.be = a.length, 0 === this.be ? Q(this.b) : (this.La(), R(this.b)))
};
gd.prototype.La = function() {
    var a = K(this.b);
    if (a) {
        M(this.b);
        var b, c = A.a.S.yb;
        L("div", a, null, "sectionTitle").innerHTML = 1 === c.length ? "任务已完成": "任务已完成";
        for (b = 0; b < c.length; b++) hd(a, c[b])
    }
};
function hd(a, b) {
    var c = L("div", a, null, null),
    c = L("div", c, null, null),
    d = L("div", a, null, null);
    c.style.marginTop = "10px";
    c.innerHTML = "你完成了一个任务!你根据那个老人的请求,已经杀死了<strong>" + b.Oc + "个" + b.Wa + "</strong>!干得好.";
    d.style.textAlign = "center";
    d.style.margin = "0";
    c = L("a", d, null, "collectRewardButton");
    c.title = "收获报酬.";
    c.innerHTML = "收获报酬";
    c.onclick = function() {
        A.Fe.Me(b);
        return ! 1
    }
};
function id() {
    this.b = "artifact_container";
    this.md = null;
    this.h = !1
}
id.prototype.f = function() {
    this.La();
    this.h = !1;
    Q(this.b)
};
id.prototype.g = function() {
    var a = A.a.qa.mb,
    b = null !== a;
    this.h !== b && (this.h = b, a ? (this.md.innerHTML = "获得" + a.ee, R(this.b)) : Q(this.b))
};
id.prototype.La = function() {
    var a = K(this.b);
    if (a) {
        M(this.b);
        L("div", a, null, "sectionTitle").innerHTML = "发现上古神器";
        var b = L("div", a, null, null);
        b.style.marginTop = "10px";
        b.innerHTML = "你发现一件强大的上古神器.";
        a = L("div", a, null, null);
        a.style.textAlign = "center";
        a.style.margin = "0";
        this.md = L("a", a, null, "takeArtifactButton");
        this.md.title = "获得上古神器.";
        this.md.innerHTML = "获得神器";
        this.md.onclick = function() {
            A.Fe.We();
            return ! 1
        }
    }
};
function jd() {
    this.b = "artifact_effects_container";
    this.h = !1;
    this.ec = -1
}
jd.prototype.f = function() {
    this.h = !1;
    this.ec = -1;
    M(this.b)
};
jd.prototype.g = function() {
    var a = ia().length;
    if (this.ec !== a) if (this.ec = a, 0 === a) this.h = !1,
    M(this.b);
    else {
        if (a = K(this.b)) {
            M(this.b);
            var a = L("table", a, null, "cleanTable"),
            b = a.insertRow(0),
            c = T(b, "firstColumn"),
            b = T(b, null);
            c.innerHTML = "上古神器效果描述";
            b.innerHTML = "加成";
            for (var b = 1,
            d, f, g, c = 0; c < C.length; c++) if (d = C[c], d.e !== d.oa) {
                f = a.insertRow(b);
                b++;
                g = f.insertCell(0);
                f = f.insertCell(1);
                g.innerHTML = d.description;
                var h = d.e,
                l = d.oa;
                f.innerHTML = d.Ka ? 0 < d.ta ? w(100 * Math.abs(h - l)) + "%": w(Math.ceil(100 * Math.abs(l - h))) + "%": w(h);
                0 == b % 2 ? g.className = "firstCol": (g.className = "firstColAlt", f.className = "alt")
            }
        }
        this.h || (this.h = !0, R(this.b))
    }
};
function kd() {
    this.b = "artifact_collection_container";
    this.table = null;
    this.ec = -1
}
kd.prototype.f = function() {
    this.h = !1;
    this.ec = -1;
    M(this.b)
};
kd.prototype.g = function() {
    var a = ia().length;
    this.ec !== a && (this.ec = a, 0 === a ? (this.h = !1, M(this.b)) : (this.hd(), this.h || (this.h = !0, R(this.b))))
};
kd.prototype.hd = function() {
    var a = K(this.b);
    if (a) {
        M(this.b);
        var a = L("table", a, null, "cleanTable"),
        b = a.insertRow(0),
        c = T(b, "firstColumn"),
        b = T(b, null);
        c.innerHTML = "上古神器";
        b.innerHTML = "效果";
        for (var d, f, g = ia(), c = 0; c < g.length; c++) b = g[c],
        d = a.insertRow(c + 1),
        f = d.insertCell(0),
        f.innerHTML = b.ee,
        d = d.insertCell(1),
        d.innerHTML = C[b.fe].description,
        0 == c % 2 ? f.className = "firstCol": (f.className = "firstColAlt", d.className = "alt")
    }
};
function ld() {
    this.b = "artifactsTabContainer";
    this.U = "artifactsTab";
    this.v = !1;
    this.df = new jd;
    this.cf = new kd
}
ld.prototype.f = function() {
    this.v = !1;
    Q(this.U);
    Q(this.b);
    this.df.f();
    this.cf.f()
};
ld.prototype.g = function() {
    0 === ia().length ? this.v && (this.v = !1, Q(this.U)) : this.v || (this.v = !0, R(this.U));
    this.v && (this.df.g(), this.cf.g())
};
function md() {
    this.b = "machine_part_container";
    this.Z = null;
    this.nd = "machine_part_title";
    this.Ya = this.Za = this.fa = this.Ob = this.Kb = this.xb = null;
    this.vd = this.xd = this.Vd = this.h = !1
}
md.prototype.f = function() {
    this.vd = this.Vd = this.xd = this.h = !1;
    this.La()
};
md.prototype.g = function() {
    var a = Ab(A.a.K),
    b = null !== a,
    c = zb(),
    d = H(),
    f = yb() && !c,
    g = !d && (b || f || c);
    this.h !== g && ((this.h = g) ? (R(this.b), P(this.xb), P(this.Z)) : (this.vd = this.Vd = this.xd = !1, O(this.xb), O(this.Z), d ? M(this.b) : (O(this.Kb), O(this.Ob), O(this.fa)), Q(this.b)));
    g && (this.Vd !== b && ((this.Vd = b) ? (this.xb.innerHTML = "发现机械零件", b = A.a.K, this.Z.innerHTML = 0 > b.Ta ? null: Bb[b.Ta].ka, this.Kb.innerHTML = "获得" + a, P(this.Kb)) : O(this.Kb)), f != this.xd && ((this.xd = f) ? (this.xb.innerHTML = "遇到工程师", this.Z.innerHTML = "你遇到一位工程师.因为一些原因,你没有立刻杀死他(像你一贯的作风).他注意到有机械部件伸出你的行李,他提到他很有可能可以将它们组装成有用的东西.", P(this.Ob)) : O(this.Ob)), c && !this.vd && ((this.vd = c) ? (this.xb.innerHTML = "创建机器人", this.Z.innerHTML = "你有些尴尬地看着工程师粗鲁的把各种零件拼接在一起.很快,一台机器人崭新出炉.不幸的是,机器人启动后的第一件事就是把工程师,它的创造者撕成碎片.根据这个,你推断机器人的初始命令是杀死所有活的生物.你欢迎他加入你的队伍.", P(this.Za), P(this.fa)) : (O(this.Za), O(this.fa))))
};
md.prototype.La = function() {
    var a = K(this.b);
    if (a) {
        M(this.b);
        this.xb = K(this.nd);
        this.xb || (this.xb = L("div", a, this.nd, "sectionTitle"));
        this.xb.innerHTML = "";
        this.xb.style.display = "none";
        this.Z = L("div", a, null, null);
        this.Z.style.marginTop = "10px";
        this.Z.innerHTML = "";
        this.Z.style.display = "none";
        this.Kb = L("a", a, null, "takeMachinePartButton");
        this.Kb.title = "捡起机械零件.";
        this.Kb.innerHTML = "获得机械零件";
        this.Kb.onclick = function() {
            var a = A.a.K,
            b = Ab(a);
            b && (a.sb.push(b), a.Ta = -1, a.Zb = p());
            return ! 1
        };
        this.Ob = L("a", a, null, "takeMachinePartButton");
        this.Ob.title = "装配机械零件";
        this.Ob.innerHTML = "装配机械零件";
        this.Ob.onclick = function() {
            A.a.K.Pc = !0;
            return ! 1
        };
        this.Za = L("div", a, null, null);
        this.Za.style.marginTop = "5px";
        this.Za.style.marginLeft = "auto";
        this.Za.style.marginRight = "auto";
        this.Za.style.border = "1px solid #444";
        this.Za.style.padding = "5px";
        this.Za.style.width = "450px";
        this.Za.appendChild(document.createTextNode("给你的机器人命名: "));
        this.Ya = L("input", this.Za, null, null);
        this.Ya.type = "text";
        this.Ya.size = 25;
        this.Ya.value = "屠杀号-7";
        var b = this;
        this.fa = L("a", a, null, "takeMachinePartButton");
        this.fa.title = "添加机器人到队伍";
        this.fa.innerHTML = "添加机器人到队伍";
        this.fa.onclick = function() {
            var a = x(b.Ya.value),
            d,
            f = -1;
            for (d = 0; d < A.k.length; d++) if (A.k[d].Qc) {
                f = d;
                break
            }
            d = qc(f);
            d.wa = a;
            A.a.c.push(d);
            A.a.R[d.O] = d;
            ic(d);
            A.dc.f();
            a = A.a.K;
            a.jd = !0;
            a.Hc = !1;
            a.Pc = !1;
            a.Zb = -1;
            a.sb.length = 0;
            a.Ta = -1;
            y("Robot", "Creation");
            return ! 1
        };
        O(this.Kb);
        O(this.Ob);
        O(this.fa);
        O(this.Za);
        O(a)
    }
};
function nd() {
    this.b = "machinePartsTabContainer";
    this.U = "machinePartsTab";
    this.C = "found_machine_parts_table";
    this.table = null;
    this.Ke = -1;
    this.v = !1
}
nd.prototype.f = function() {
    this.v = "none" !== K(this.U).style.display;
    var a = K(this.b);
    a && (M(this.b), (this.table = K(this.C)) ? N(this.table, !1) : this.table = L("table", a, this.C, "cleanTable"), a = this.table.insertRow(0), T(a, "firstColumn").innerHTML = "发现的机械零件");
    this.Ke = -1
};
nd.prototype.g = function() {
    var a = A.a.K.sb;
    0 === a.length ? this.v && (this.v = !1, Q(this.U)) : (this.v || (this.v = !0, R(this.U)), this.Ke !== a.length && (this.hd(), this.Ke = a.length))
};
nd.prototype.hd = function() {
    var a, b = A.a.K.sb,
    c;
    N(this.table, !0);
    for (a = 0; a < b.length; a++) c = this.table.insertRow(a + 1),
    c = c.insertCell(0),
    c.innerHTML = b[a],
    c.className = 0 == a % 2 ? "firstCol": "firstColAlt"
};
function od() {
    this.b = "defeatedBossesTabContainer";
    this.U = "defeatedBossesTab";
    this.C = "defeated_boss_table";
    this.table = null;
    this.re = -1;
    this.v = !1
}
od.prototype.f = function() {
    this.v = "none" !== K(this.U).style.display;
    this.ba();
    this.re = -1
};
od.prototype.g = function() {
    var a = A.a.kb.hb;
    0 === a.length ? this.v && (this.v = !1, Q(this.U)) : (this.v || (this.v = !0, R(this.U)), this.re !== a.length && (this.hd(), this.re = a.length))
};
od.prototype.hd = function() {
    var a, b = A.a.kb.hb,
    c, d;
    N(this.table, !0);
    for (a = 0; a < b.length; a++) c = this.table.insertRow(a + 1),
    d = c.insertCell(0),
    d.innerHTML = b[a].gf,
    d.className = "firstCol",
    c = c.insertCell(1),
    c.innerHTML = b[a].rc(),
    0 == a % 2 ? d.className = "firstCol": (d.className = "firstColAlt", c.className = "alt")
};
od.prototype.ba = function() {
    var a = K(this.b);
    a && (M(this.b), (this.table = K(this.C)) ? N(this.table, !1) : this.table = L("table", a, this.C, "cleanTable"), a = this.table.insertRow(0), T(a, "firstColumn").innerHTML = "首领", T(a, null).innerHTML = "等级")
};
function pd() {
    this.Ib = -1
}
pd.prototype.f = function() {};
pd.prototype.g = function() {
    var a;
    a = A.Lb.Ib;
    this.Ib !== a && 0 < a && (this.Ib = a, S("lastSaveDiv", "最后一次存档: " + (new Date(this.Ib)).toLocaleTimeString()))
};
function qd() {
    this.b = "prestigeButtonContainer";
    this.Cd = "prestigeConfirmationContainer";
    this.Pe = !1
}
qd.prototype.f = function() {
    M(this.b);
    Q(this.b);
    this.Pe = !1
};
qd.prototype.g = function() {
    var a = A.a.Sa.cc;
    this.Pe !== a && ((this.Pe = a) ? (rd(this), R(this.b), Q(this.Cd)) : (M(this.b), M(this.Cd), Q(this.b)))
};
function rd(a) {
    var b = K(a.b),
    c = K(a.Cd);
    if (b && c) {
        M(a.b);
        M(a.Cd);
        var d = L("a", b, null, "saveButton");
        d.innerHTML = "声望";
        d.onclick = function() {
            d.style.display = "none";
            c.style.display = "block";
            return ! 1
        };
        a = L("div", c, null, null);
        a.style.marginBottom = "5px";
        a = L("span", a, null, null);
        a.innerHTML = "你确定吗?这将会结束游戏并让你以一支全新的队伍重新开始.";
        a.style.fontWeight = "bold";
        a = L("a", c, null, "saveButton");
        a.innerHTML = "声望!";
        a.onclick = function() {
            Xc();
            O(d);
            O(c);
            return ! 1
        };
        a = L("a", c, null, "saveButton");
        a.innerHTML = "关闭";
        a.style.marginLeft = "5px";
        a.onclick = function() {
            P(d);
            O(c);
            return ! 1
        }
    }
};
function sd() {
    this.b = "prestige_info_container"
}
sd.prototype.f = function() {
    var a = K(this.b);
    if (a && (M(this.b), 0 !== A.a.P.ja)) {
        var a = L("table", a, null, "cleanTable"),
        b = a.insertRow(0),
        c = a.insertRow(1),
        d = a.insertRow(2),
        f = a.insertRow(3),
        g = a.insertRow(4),
        a = a.insertRow(5),
        h = T(b, "firstColumn"),
        b = T(b, null);
        h.innerHTML = "声望信息";
        b.innerHTML = "价值";
        b = c.insertCell(0);
        c = c.insertCell(1);
        b.innerHTML = "声望计数";
        b.className = "firstColumn";
        c.innerHTML = A.a.P.ja;
        c = d.insertCell(0);
        d = d.insertCell(1);
        c.innerHTML = "缓存大小加成";
        c.className = "firstColumn";
        d.innerHTML = A.a.P.ja * Ga;
        d = f.insertCell(0);
        f = f.insertCell(1);
        d.innerHTML = "CPS加成";
        d.className = "firstColumn";
        f.innerHTML = q(100 * (1 + A.a.P.ja * ua) - 100) + "%";
        f = g.insertCell(0);
        g = g.insertCell(1);
        f.innerHTML = "技能冷却时间下降";
        f.className = "firstColumn";
        g.innerHTML = q(A.a.P.ja * Tb / 1E3) + " 秒";
        g = a.insertCell(0);
        a = a.insertCell(1);
        g.innerHTML = "在声望后可以持有上古神器的最大数量";
        g.className = "firstColumn";
        a.innerHTML = q(A.a.P.ja * fa)
    }
};
sd.prototype.g = function() {};
function td() {
    this.b = "champions_table_container"
}
td.prototype.f = function() {
    var a = K(this.b);
    if (a) {
        M(this.b);
        var b = A.a.P.Wc;
        if (b && 0 !== b.length) for (var c = 1,
        d = ud(b, c); 0 !== d.length;) {
            var f = L("table", a, null, "cleanTable"),
            g = f.insertRow(0),
            h = T(g, "noBackground"),
            l = T(g, null),
            k = T(g, null);
            h.innerHTML = "冠军";
            l.innerHTML = "职业";
            k.innerHTML = "等级";
            for (var s = k = g = void 0,
            g = 0; g < d.length; g++) s = d[g],
            k = f.insertRow(g + 1),
            h = k.insertCell(0),
            l = k.insertCell(1),
            k = k.insertCell(2),
            0 == g % 2 ? h.className = "firstCol": (h.className = "firstColAlt", l.className = "alt", k.className = "alt"),
            h.innerHTML = s.kf,
            l.innerHTML = s.hf,
            k.innerHTML = s.jf;
            c++;
            d = ud(b, c)
        }
    }
};
td.prototype.g = function() {};
function ud(a, b) {
    var c, d, f = [];
    for (c = 0; c < a.length; c++) d = a[c],
    d.Tf === b && f.push(d);
    return f
};
function vd() {
    this.b = "championsTabContainer";
    this.U = "championsTab";
    this.v = !1;
    this.qg = new sd;
    this.gg = new td
}
vd.prototype.f = function() {
    this.v = "none" !== K(this.U).style.display;
    this.qg.f();
    this.gg.f()
};
vd.prototype.g = function() {
    0 === A.a.P.Wc.length ? this.v && (this.v = !1, Q(this.U)) : this.v || (this.v = !0, R(this.U))
};
function wd() {
    this.b = "encountered_character_container";
    this.Ya = this.je = this.Xa = this.vc = this.pd = this.Z = this.Jb = this.ac = this.fa = null;
    this.h = !1;
    this.i = this.Sb = -1
}
wd.prototype.f = function() {
    this.h = !1;
    this.i = -1;
    this.La()
};
wd.prototype.g = function() {
    var a;
    a = -1 < A.a.t.i;
    var b, c;
    this.h !== a ? (this.h = a) ? (this.i = A.a.t.i, a = A.k[this.i].className, b = A.k[this.i].description, c = Math.max(0, A.a.t.va.length - 1), this.Sb = xd - A.a.t.eb, this.je.innerHTML = "职业:" + a, this.Z.innerHTML = "你遇到一位友好的<strong>" + a + "</strong>,想要加入你的队伍.", this.pd.innerHTML = "能力: " + b, 0 < this.Sb ? (this.fa.style.display = "inline-block", this.ac.style.display = "inline-block", this.Jb.style.display = "none", this.vc.innerHTML = "你的队伍还能添加" + this.Sb + "名成员,但是还会有" + c + "名角色在" + a + "之后出现") : (this.fa.style.display = "none", this.ac.style.display = "none", this.Jb.style.display = "inline-block", this.vc.innerHTML = "你的队伍已经满了.你只有在'管理'(队伍管理)标签移除一个队员后才能添加."), this.Ya.value = A.k[this.i].F, R(this.b)) : Q(this.b) : this.h && (b = xd - A.a.t.eb, this.Sb !== b && (0 === this.Sb && 0 < b ? (this.fa.style.display = "inline-block", this.ac.style.display = "inline-block", this.Jb.style.display = "none", this.i = A.a.t.i, a = A.k[this.i].className, c = Math.max(0, A.a.t.va.length - 1), this.vc.innerHTML = "你的队伍还能添加" + this.Sb + "名成员,但是还会有" + c + "名角色在" + a + "之后出现") : 0 === b && 0 < this.Sb && (this.fa.style.display = "none", this.ac.style.display = "none", this.Jb.style.display = "inline-block", this.vc.innerHTML = "你的队伍已经满了.你只有在'管理'(队伍管理)标签移除一个队员后才能添加."), this.Sb = b))
};
wd.prototype.La = function() {
    var a = K(this.b);
    if (a) {
        M(this.b);
        L("div", a, null, "sectionTitle").innerHTML = "发现冒险家!";
        this.Z = L("div", a, null, null);
        this.Z.style.marginTop = "10px";
        this.Z.innerHTML = "";
        this.Xa = L("div", a, null, null);
        this.Xa.style.marginTop = "5px";
        this.Xa.style.marginLeft = "auto";
        this.Xa.style.marginRight = "auto";
        this.Xa.style.border = "1px solid #444";
        this.Xa.style.padding = "5px";
        this.Xa.style.width = "450px";
        this.Xa.appendChild(document.createTextNode("姓名: "));
        this.Ya = L("input", this.Xa, null, null);
        this.Ya.type = "text";
        this.Ya.size = 25;
        this.Ya.value = "";
        this.je = L("span", this.Xa, null, null);
        this.je.style.marginLeft = "5px";
        this.pd = L("div", this.Xa, null, null);
        this.pd.style.marginTop = "5px";
        this.pd.innerHTML = "";
        this.vc = L("div", this.Xa, null, null);
        this.vc.style.marginTop = "5px";
        this.vc.innerHTML = "";
        var b = L("div", a, null, null);
        b.style.textAlign = "center";
        b.style.margin = "0";
        var c = this;
        this.fa = L("a", b, null, "addToPartyButton");
        this.fa.title = "这个人可能对你有帮助.";
        this.fa.innerHTML = "欢迎加入我的队伍!";
        this.fa.onclick = function() {
            A.k[c.i].F = x(c.Ya.value);
            yd(c.i);
            c.i = -1;
            return ! 1
        };
        this.ac = L("a", b, null, "rejectCharacterButton");
        this.ac.title = "谢了,但是还是算了.";
        this.ac.innerHTML = "别管闲事,继续前进.";
        this.ac.onclick = function() {
            zd(c.i);
            c.i = -1;
            return ! 1
        };
        this.Jb = L("a", b, null, "rejectCharacterButton");
        this.Jb.title = "谢了,但是还是算了.";
        this.Jb.innerHTML = "抱歉,也许下一次";
        this.Jb.style.display = "none";
        this.Jb.onclick = function() {
            zd(c.i);
            c.i = -1;
            return ! 1
        };
        O(a)
    }
};
function Ad() {
    this.b = "party_management_container";
    this.U = "partyManagementTab";
    this.Ne = "party_management_view_members";
    this.Xe = "party_management_view_unlocked";
    this.zc = [];
    this.xe = this.Ye = 0;
    this.Oe = !1
}
Ad.prototype.f = function() {
    this.xe = this.Ye = 0;
    this.Oe = !1;
    M(this.b)
};
Ad.prototype.g = function() {
    if (this.xe !== A.a.c.length) {
        this.xe = A.a.c.length;
        var a = K(this.b);
        if (a) {
            var b = K(this.Ne);
            b ? M(this.Ne) : b = L("div", a, this.Ne, "sectionDiv");
            L("div", b, null, "sectionTitle").innerHTML = "队伍成员";
            for (a = 0; a < A.a.c.length; a++) Bd(b, A.a.c[a], a)
        }
    }
    b = A.a.t.ab.length;
    H() && b++;
    if (this.Ye !== b && (this.Ye = b, this.zc.length = 0, a = K(this.b))) { (b = K(this.Xe)) ? M(this.Xe) : b = L("div", a, this.Xe, "sectionDiv");
        L("div", b, null, "sectionTitle").innerHTML = "已解锁角色";
        var a = A.a.t.ab,
        c, d;
        a: {
            for (c = 0; c < A.k.length; c++) if (A.k[c].Qc) {
                d = c;
                break a
            }
            d = -1
        }
        var f;
        for (f = 0; f < a.length; f++) c = a[f],
        this.Nd(c) || c === d || Cd(this, b, c);
        H() && (this.Nd(d) || Cd(this, b, d))
    }
    b = 1 > (H() ? Dd: Ed) - A.a.c.length;
    if (this.Oe !== b) if (this.Oe = b) for (b = 0; b < this.zc.length; b++) this.zc[b].style.display = "none";
    else for (b = 0; b < this.zc.length; b++) this.zc[b].style.display = "inline-block"
};
function Bd(a, b, c) {
    var d = b.i,
    f = b.wa,
    g = b.O;
    a = L("div", a, null, null);
    a.style.marginTop = "5px";
    a.style.marginLeft = "auto";
    a.style.marginRight = "auto";
    a.style.border = "1px solid #444";
    a.style.padding = "5px";
    a.style.width = "450px";
    a.appendChild(document.createTextNode("姓名: "));
    var h = L("input", a, null, null);
    h.type = "text";
    h.size = 25;
    h.value = f;
    h.onkeyup = function() {
        A.k[d].F = x(h.value);
        b.wa = h.value
    };
    h.onchange = function() {
        A.k[d].F = x(h.value);
        b.wa = h.value
    };
    f = L("span", a, null, null);
    f.innerHTML = "职业:" + g;
    f.style.marginLeft = "5px";
    g = L("div", a, null, null);
    g.style.marginTop = "5px";
    g.innerHTML = A.k[d].description;
    0 === c ? (c = L("div", a, null, null), c.style.marginTop = "5px", c.innerHTML = "无法删除初始角色.") : (c = L("div", a, null, null), c.style.textAlign = "center", c.style.margin = "0", c = L("a", c, null, "removeCharacterButton"), c.title = "从我队伍里滚出去.", c.innerHTML = "从队伍里移除", c.onclick = function() {
        var a = A.a.c.indexOf(b); - 1 !== a && (xa(A.a.nb, b), xa(A.a.Va, b), xa(A.a.Y, b), A.a.c.splice(a, 1), delete A.a.R[b.O], A.jb.gd(b), A.a.M.gd(), A.a.t.gd(), A.dc.f(), y("Character", "已移除: " + b.O));
        return ! 1
    })
}
function Cd(a, b, c) {
    var d = A.k[c].F,
    f = A.k[c].className;
    b = L("div", b, null, null);
    b.style.marginTop = "5px";
    b.style.marginLeft = "auto";
    b.style.marginRight = "auto";
    b.style.border = "1px solid #444";
    b.style.padding = "5px";
    b.style.width = "450px";
    b.appendChild(document.createTextNode("姓名: "));
    var g = L("input", b, null, null);
    g.type = "text";
    g.size = 25;
    g.value = d;
    g.onkeyup = function() {
        A.k[c].F = x(g.value)
    };
    g.onchange = function() {
        A.k[c].F = x(g.value)
    };
    d = L("span", b, null, null);
    d.innerHTML = "职业:" + f;
    d.style.marginLeft = "5px";
    f = L("div", b, null, null);
    f.style.marginTop = "5px";
    f.innerHTML = A.k[c].description;
    f = L("div", b, null, null);
    f.style.textAlign = "center";
    f.style.margin = "0";
    f = L("a", f, null, "addCharacterButton");
    f.title = "这个人可能对你有帮助.";
    f.innerHTML = "加入到队伍";
    f.onclick = function() {
        A.k[c].F = x(g.value);
        yd(c);
        return ! 1
    };
    1 > xd - A.a.t.eb && (f.style.display = "none");
    a.zc.push(f)
}
Ad.prototype.Nd = function(a) {
    var b;
    for (b = 0; b < A.a.c.length; b++) if (A.a.c[b].i === a) return ! 0;
    return ! 1
};
function Fd() {
    this.od = []
}
function Y(a) {
    A.dc.od.push(a)
}
Fd.prototype.f = function() {
    var a;
    for (a = 0; a < this.od.length; a++) this.od[a].f()
};
function Gd() {
    this.Wf = "庇护所;屠宰场;地洞;地下室;山洞;地下墓穴;地穴;窄小通道;膛室;洞穴;空洞;地窖;贼窝;熔炉;岩洞;山谷;孔洞;地狱;迷宫;迷路园;矿山;陵墓;沼泽;大墓地;地下密牢;矿井;密室;走廊;领域;坟墓;地道;屠宰场;下层地下室;地下室;底层;乱葬岗;拷问室;隧道;墓穴;地下通道;地下广场;下层结构;拱顶".split(";");
    this.af = "厌恶的 可恶的 可憎的 血腥的 诅咒的 该死的 破旧的 黑暗的 昏暗的 遗弃的 疯狂的 邪恶的 肮脏的 冷酷的 凶恶的 可恨的 可怕的 绝命的 地狱的 无光的 讨厌的 陈腐的 恶心的 肮脏的 丑恶的 不快的 有毒的 腐败的 破败的 腐烂的 忌讳的 烟熏的 反叛的 发臭的 恶臭的 作呕的 阴影的 恶劣的".split(" ")
}
function na(a) {
    return "位于:" + a.af[r(a.af.length)] + "" + a.Wf[r(a.Wf.length)]
};
function tb() {
    var a = A.De;
    return a.Cf[r(a.Cf.length)]
}
function Z(a) {
    return a[r(a.length)]
};
function Hd() {
    this.ga = "实惠的;有趣的;业余的;变质的;契约的;廉价的;恶劣的;起泡的;破解的;初学的;瑕疵的;繁重的;纸板的;粗糙的;廉价的;斑驳的;粗糙的;可爱的;破裂的;俗气的;二流的;幼稚的;儿童的;贬损的;悲鸣的;整洁的;缺陷的;分解的;停产的;肮脏的;经济的;入门的;微弱的;简朴的;裂纹的;污染的;愚蠢的;遗忘的;花哨的 ;俗丽的;卑鄙的;腐败的;诙谐的;劣势的;受损的;缺陷的;粗劣的;较小的;恶心的;暗淡的;渴望的;卑贱的;不恰的;无关的;廉价的;不足的;难耐的;猥琐的;平庸的;破坏的;次要的;发霉的;减价的;吝啬的;新手的;新奇的;忽略的;手工的;氧化的;微小的;琐碎的;孱弱的;可怜的;腐败的;问题地;纸型的;塑料的;徒步的;腐化的;腐臭的;生锈的;紊乱的;追溯的;艰苦的;矮小的;繁茂的;腐烂的;荒废的;破烂的;排斥的;分裂的;罪恶的;卑劣的;点缀的;变质的;振作的;下流的;二阶的;二流的;赝品的;肮脏的;污秽的;遗憾的;佯装的;刺耳的;玷污的;发泡的;俗气的;费力的;破旧的;节约的;三队的;灰暗的;琐细的;轻浮的;玩具的;笨拙的;不堪的;不美的;等闲的;二手的;外行的;病态的;不称的;不值的;无用的;磨损的;耗尽的;木质的;浪费的;枯萎的;卑微的;批发的;虚弱的".split(";");
    this.Ba = "煽动;烦恼;烦扰;笨拙;混乱;不安;困境;饥馑;缺乏;危难;难堪;虚弱;沉重;心梗;耻辱;不便;刺激;昏睡;亏损;低伤;低价;平常;妨害;怜悯;低劣;排斥;缓慢;不足;缺乏;朴素;废墟;悲伤;碎片;沉闷;浪费;欲望".split(";");
    this.ha = "业余 该死 酗酒 平凡 痛苦 平庸 新手 菜鸟 新兵 贫穷 初生 可怜 悲伤 匮乏".split(" ")
}
Hd.prototype.Jc = function() {
    var a = Math.random();
    return 0.1 > a ? 0 : 0.7 > a ? 1 : 0.85 > a ? 0.5 > Math.random() ? 2 : 3 : 0.5 > Math.random() ? 4 : 5
};
Hd.prototype.Wb = function() {
    return this.ga[r(this.ga.length)]
};
Hd.prototype.sc = function() {
    return this.Ba[r(this.Ba.length)]
};
Hd.prototype.tc = function() {
    return this.ha[r(this.ha.length)]
};
function Id() {
    this.ga = "合意的;充足的;愉快的;适当的;权利的;平均的;忍受的;青铜的;基础的;常规的;普通的;合金的;平凡的;习惯的;正派的;减少的;日常的;精巧的;公平的;良好的;一般的;园艺的;中间的;未完的;钢铁的;可以的;平凡的;温和的;谦虚的;普通的;美好的;平凡的;尚可的;维持的;愉快的;清楚的;古雅的;可敬的;平庸的;规则的;有关的;卓越的;必须的;合理的;日常的;满意的;库存的;简单的;规范的;相配的;适当的;足够的;标准的;耐用的;可以的;变色的;典型的;普通的;平凡的;有益的;惯例的;达标的;兰花的;值得的".split(";");
    this.Ba = "合格 适当 正派 熟悉 瑕疵 常态 重视 整齐 日常 适合 朴素 适用 有效".split(" ");
    this.ha = ["平均", "民众", "普通", "人民"]
}
Id.prototype.Jc = function() {
    var a = Math.random();
    return 0.3 > a ? 1 : 0.6 > a ? 0.5 > Math.random() ? 2 : 3 : 0.5 > Math.random() ? 4 : 5
};
Id.prototype.Wb = function() {
    return this.ga[r(this.ga.length)]
};
Id.prototype.sc = function() {
    return this.Ba[r(this.Ba.length)]
};
Id.prototype.tc = function() {
    return this.ha[r(this.ha.length)]
};
function Jd() {
    this.ga = "可敬的;平衡的;合金的;选择的;很好的;合意的;特色的;精巧的;幻想的;稳固的;一流的;超流的;残忍的;强大的;良好的;英勇的;坚硬的;沉重的;英俊的;诚实的;敏锐的;品牌的;非凡的;抛光的;领袖的;可贵的;素质的;文雅的;卓越的;皇家的;光泽的;金属的;严厉的;选择的;特殊的;结实的;炫耀的;坚定的;优胜的;锐利的;雅致的;顶尖的;罕见的;健康的".split(";");
    this.Ba = "冒险 勇敢 胆量 信任 决心 破坏 恐惧 惊骇 霜冻 友谊 预兆 沉闷 强烈 公正 敏锐 复仇 坚持 毅力 平静 预言 刺骨 疼痛 欢笑 勇气 恶意 明星 精神 胜利 暴力 伤害".split(" ");
    this.ha = "大胆 英勇 起泡 勇敢 大胆 注定 华丽 无畏 黑暗 沉醉 公正 大量 虐待 侵略 徒劳 征服 自愿".split(" ")
}
Jd.prototype.Jc = function() {
    var a = Math.random();
    return 0.3 > a ? 1 : 0.5 > a ? 0.5 > Math.random() ? 2 : 3 : 0.5 > Math.random() ? 4 : 5
};
Jd.prototype.Wb = function() {
    return this.ga[r(this.ga.length)]
};
Jd.prototype.sc = function() {
    return this.Ba[r(this.Ba.length)]
};
Jd.prototype.tc = function() {
    return this.ha[r(this.ha.length)]
};
function Kd() {
    this.ga = "可怕的;惊人的;诧异的;美丽的;神佑的;经典的;优雅的;精致的;奢侈的;非凡的;卓越的;完美的;凶猛的;可怕的;金典的;光荣的;高级的;出名的;高档的;可爱的;豪华的;神秘的;高贵的;华丽的;珍贵的;完善的;最初的;额外的;卓越的;精粹的;稀有的;单一的;生命的;显著地;轰动的;至高的;无上的;精彩的".split(";");
    this.Ba = "惊愕;恐惧;爆炸;轻松;附击;附伤;火焰;霜冻;烈焰;残暴;迷恋;噩梦;荣耀;魔力;炫目;伟大;幸福;冰块;玩笑;惩罚;纯洁;希望;完美;恐怖;折磨;奇迹;惊叹".split(";");
    this.ha = "深渊 黎明 大地 畏惧 无谓 遗忘 强硬 勇敢 衰弱 英勇".split(" ")
}
Kd.prototype.Jc = function() {
    var a = Math.random();
    return 0.25 > a ? 1 : 0.5 > a ? 0.5 > Math.random() ? 2 : 3 : 0.5 > Math.random() ? 4 : 5
};
Kd.prototype.Wb = function() {
    return this.ga[r(this.ga.length)]
};
Kd.prototype.sc = function() {
    return this.Ba[r(this.Ba.length)]
};
Kd.prototype.tc = function() {
    return this.ha[r(this.ha.length)]
};
function Ld() {
    this.ga = "受膏的 全能的 天使的 天上的 神圣的 神化的 飘渺的 尊贵的 禁止的 美好的 史诗的 无双的 奇迹的 完美的 不朽的 高贵的 赞美的 凶残的 神奇的 拔群的 正义的 庄严地 圣洁的 透明的 卓越的 超脱的 怪异的 无情的 邪恶的 贞洁的 非常的".split(" ");
    this.Ba = "敬畏 末日 灭绝 灾难 毁坏 屠杀 信仰 自由 财富 虚幻 浩劫 天堂 不朽 拯救 星尘 复仇 英勇".split(" ");
    this.ha = "岁月;远古;天启;鲁莽;全能;有福;神选;灾难;忘却;禁止;神明;女神;屠杀;迷雾;月色;月光;苍月;纯净;正义;天空;太阳;星辰;神道;暗影;星光;无畏;无惧;无双;贤惠;冷风".split(";")
}
Ld.prototype.Jc = function() {
    var a = Math.random();
    return 0.25 > a ? 1 : 0.5 > a ? 0.5 > Math.random() ? 2 : 3 : 0.5 > Math.random() ? 4 : 5
};
Ld.prototype.Wb = function() {
    return this.ga[r(this.ga.length)]
};
Ld.prototype.sc = function() {
    return this.Ba[r(this.Ba.length)]
};
Ld.prototype.tc = function() {
    return this.ha[r(this.ha.length)]
};
function Md() {
    this.ga = "惊骇的;非典的;灿烂的;定制的;狡猾的;聪明的;勇敢的;大胆的;特色的;独家的;天才的;史诗的;手工的;无双的;孤独的;残忍的;奇迹的;独特的;绝伦的;正义的;聪慧的;特殊的;奇异的;邪恶的;勇敢的;徒劳的".split(";");
    this.Pf = "绝对 诧异 勇敢 独裁 非凡 先天 惊人 陶醉 失真 巨大 神秘 完美 卓越 精粹 超级 合计 奇迹 神话 独步 无敌 无尽 超常 空前 无比 无双 危难 超脱".split(" ");
    this.Qf = "看法 冒险 勇气 信任 冷静 毁灭 荒废 效能 凶猛 荣誉 魅力 伟大 紧张 权利 完美 坚持 毅力 品质 柔滑 风格 精神 胜利 暴力 奇迹".split(" ");
    this.ha = ["专家"]
}
Md.prototype.Jc = function() {
    return 4
};
Md.prototype.Wb = function() {
    return this.ga[r(this.ga.length)]
};
Md.prototype.sc = function() {
    return this.Pf[r(this.Pf.length)] + "" + this.Qf[r(this.Qf.length)]
};
Md.prototype.tc = function() {
    return this.ha[r(this.ha.length)]
};
function Nd() {
    this.kg = new Hd;
    this.uf = new Id;
    this.tg = new Jd;
    this.og = new Kd;
    this.Ef = new Ld;
    this.ug = new Md
}
function Od(a, b) {
    var c;
    switch (b.Ha()) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        c = a.kg;
        break;
    case 6:
    case E:
    case 8:
        c = a.uf;
        break;
    case 9:
    case 10:
    case 11:
        c = a.tg;
        break;
    case 12:
    case 13:
    case 14:
        c = a.og;
        break;
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
        c = a.Ef;
        break;
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
        c = a.Ef;
        break;
    case 40:
        c = a.ug;
        break;
    default:
        c = a.uf
    }
    return Pd(b, c)
}
function Pd(a, b) {
    switch (b.Jc()) {
    case 0:
        return a.w;
    case 1:
        return b.Wb() + "" + a.w;
    case 2:
        return b.sc() + "之" + a.w;
    case 3:
        return b.tc() + "之" + a.w;
    case 4:
        return b.Wb() + "" + b.sc() + "之" + a.w;
    case 5:
        return b.Wb() + "" + b.sc() + "之" + a.w;
    default:
        return a.w
    }
};
function Qd() {
    this.Kf = new Nd
}
function Ya(a, b, c) {
    var d = A.Jf,
    f = Math.random();
    c = 0.15 > f ? c + 1 : 0.3 > f ? Math.max(1, c - 1) : c;
    var f = a.i,
    g = r(A.k[f].T.length); (0 !== Rd.e || 0 !== Sd.e) && Math.random() < Rd.e + Sd.e && c++;
    a = new pa;
    var h = d.Ha(c, b);
    b = Td(h);
    a.w = A.k[f].T[g].d;
    a.dd = g;
    a.H = A.k[f].className;
    a.ub = c;
    a.ed = h;
    h = z(Ud, Vd);
    f = b.n * Math.pow(b.o, c - 1);
    g = 1.05 - 0.1 * Math.random();
    c = Math.max(1, q(b.p * Math.pow(b.q, c - 1) * h * (1.05 - 0.1 * Math.random())));
    a.ca = c;
    c = Math.max(1, q(f * g));
    a.j = c;
    a.tb = Od(d.Kf, a);
    return a
}
function Td(a) {
    var b, c;
    for (b = 0; b < Wd.length; b++) if (c = Wd[b], c.s === a) return c;
    return Wd[0]
}
Qd.prototype.Ha = function(a, b) {
    var c, d = null,
    f = null,
    g = 0,
    h = Math.random() * b;
    for (c = 0; c < Xd.length; c++) if (a <= Xd[c].A) {
        d = Xd[c];
        break
    }
    if (d) for (f = d.B, c = f.length - 1; 0 <= c; c--) if (g = f[c], 0 !== g) {
        if (h < g) return c;
        h -= g
    }
    return 0
};
function Yd() {}
function Zd(a) {
    a = a.Md();
    var b = $d + r(15),
    c = tb(),
    d = A.De;
    $a(c, b + "只" + (5 > a ? 0.5 > Math.random() ? c: 0.75 > Math.random() ? c + "来自" + d.Jd[r(d.Jd.length)] + "" + d.Wd[r(d.Wd.length)] : d.Id[r(d.Id.length)] + "" + c: 0.5 > Math.random() ? d.Id[r(d.Id.length)] + "" + c: c + "来自" + d.Jd[r(d.Jd.length)] + "" + d.Wd[r(d.Wd.length)]) + "(等级. " + a + ")", a, b, q((ae + ae * Math.pow(a, be)) * Math.pow(ce, a)), q(de * Math.pow(ee, a)), b * q(fe * Math.pow(ge, a)), null)
}
Yd.prototype.rc = function(a) {
    return 0 > a ? "随机首领": he[a].J
};
Yd.prototype.Md = function() {
    var a = D(),
    a = q(0.5 + (a - 1.5) + 3 * Math.random()); (0 !== ie.e || 0 !== je.e) && Math.random() < ie.e + je.e && a++;
    return Math.max(a, 1)
};
function ke() {
    this.Qa = 0;
    this.Ub = this.da = !1
}
ke.prototype.Te = function() {
    this.da ? A.a.qa.mb || (this.da = !1, le(this)) : A.a.qa.Te() && (this.da = !0)
};
ke.prototype.Ue = function() {
    this.da ? pb() || (this.da = !1, le(this)) : A.a.S.Ue() && (this.da = !0)
};
function le(a) {
    a.Ub || (a.Ub = H() || zb() || yb());
    var b = Math.random();
    a.Ub ? 0.333 > b ? (a.Qa = 1, A.a.bc.Dc = p()) : 0.666 > b ? (a.Qa = 2, A.a.qa.qc = p()) : (a.Qa = 3, A.a.S.Pb = p()) : 0.4 > b ? (a.Qa = 0, A.a.K.Zb = p()) : 0.6 > b ? (a.Qa = 1, A.a.bc.Dc = p()) : 0.8 > b ? (a.Qa = 2, A.a.qa.qc = p()) : (a.Qa = 3, A.a.S.Pb = p())
};
function rc() {
    var a = A.ke;
    Zd(a.Be);
    a = a.Yf;
    a.da = !1;
    a.Ub = !1;
    Ab(A.a.K) ? (a.Qa = 0, a.da = !0) : yb() && !zb() ? (a.Qa = 0, a.da = !0) : A.a.qa.mb ? (a.Qa = 2, a.da = !0) : pb() ? (a.Qa = 3, a.da = !0) : le(a)
}
function mc(a, b, c, d) {
    if (! (0 >= c)) for (var f = A.a.Eb; 0 < c;) {
        var g = f,
        h = 0;
        g.Rc -= c;
        g.lc < c && (h = c - g.lc);
        g.lc -= c;
        g.Ee = q(100 * (g.He - g.Rc) / g.He);
        g.Hd = 0 >= g.Rc;
        g.Hd || 0 >= g.lc ? (g.Dd = !0, g.lc = g.Ff) : g.Dd = !1;
        c = h;
        if (f.Dd) {
            h = f;
            g = b;
            A.a.M.Sd++;
            if (h = h.fc) if (A.a.M.yd++, A.a.na.Yb = !0, h.Ve) {
                var l = A.a.kb;
                h && l.hb.push(h);
                y("首领胜利", h.rc());
                h = A.a.kb; (0 === h.hb.length ? 0 : h.hb.length === he.length) && !A.a.Sa.cc && (h = A.a.Sa, h.cc = !0, h.xc = !1)
            }
            g && g.Bc++;
            var h = g,
            l = A.a.Eb,
            g = q(l.Df * (me.e + ne.e - 1)),
            k = A.a.M;
            k.Kd += g;
            if (null === l.fc && h) h.Fa += g,
            h.Fa > h.Fb && oe(h);
            else for (h = void 0, g = Math.max(1, q(g / A.a.c.length)), h = 0; h < A.a.c.length; h++) l = A.a.c[h],
            l.Fa += g,
            A.a.c[h].Fa > A.a.c[h].Fb && oe(A.a.c[h])
        }
        if (f.Hd) {
            g = a;
            h = f;
            l = d;
            k = A.a.M;
            k.ya += h.ag * (pe.e + qe.e - 1);
            A.a.M.Vb++;
            null === h.fc && (k = A.a.S.Nb[h.baseName]) && (k.Xb += h.Ge);
            k = g.Yf;
            switch (k.Qa) {
            case 0:
                a:
                if (k.da) H() || zb() ? (k.Ub = !0, k.da = !1, le(k)) : yb() || Ab(A.a.K) || (k.da = !1, le(k));
                else {
                    if (!k.Ub && (k.Ub = H() || zb() || yb(), k.Ub)) {
                        le(k);
                        break a
                    }
                    Db() && (k.da = !0)
                }
                break;
            case 1:
                k.da ? A.a.bc.ic || (k.da = !1, le(k)) : Hb() && (k.da = !0);
                break;
            case 2:
                k.Te();
                break;
            case 3:
                k.Ue()
            }
            k = A.a.t; ! ( - 1 < k.i || 0 === k.va.length || p() - k.Rb < re * (k.eb + 1)) && Math.random() < se && (k.i = k.va[r(k.va.length)]);
            if (null !== h.fc) {
                var s = k = void 0,
                h = h.Md(),
                n = s = void 0,
                u = te + r(ue - te);
                if (1 < ve.e || 1 < we.e) u = q(u * (ve.e + we.e - 1));
                for (k = 0; k < u; k++) s = A.a.c[r(A.a.c.length)],
                n = xe * ye.e * ze.e,
                s = Ya(s, n, h),
                l ? Ia(s) : Ea(s)
            } else for (k = q(Math.round(h.Ge * Ae * (ve.e + we.e - 1))), n = u = u = s = void 0, h = h.Md(), s = 0; s < k; s++) u = A.a.c[r(A.a.c.length)],
            n = z(ye, ze),
            u = Ya(u, n, h),
            l ? Ia(u) : Ea(u);
            if (A.a.aa.Na) {
                g = g.Be;
                a: {
                    k = void 0;
                    h = D();
                    k = void 0;
                    l = A.a.kb;
                    k = 0 === l.hb.length ? null: l.hb[l.hb.length - 1];
                    s = void 0;
                    l = -1;
                    s = void 0;
                    if (k) for (s = k.rc(), k = 0; k < he.length; k++) {
                        if (he[k].J === s) {
                            l = k + 1;
                            break
                        }
                    } else l = 0;
                    if ( - 1 !== l && l < he.length && (s = he[l], h >= s.L)) break a;
                    l = -1
                }
                h = 0 <= l;
                g = g.rc(l);
                l = D() + 2;
                h && l++; (0 !== ie.e || 0 !== je.e) && Math.random() < ie.e + je.e && l++;
                k = A.De;
                k = (0.5 > Math.random() ? Z(k.Zc).toUpperCase() + Z(k.Ze) + Z(k.Zc) + Z(k.Ze) + Z(k.Zc) + Z(k.Af) :Z(k.dg)  + "之" + Z(k.Zc).toUpperCase() + Z(k.Ze) + Z(k.Zc) + Z(k.Af)) + " (等级. " + l + ")";
                $a(k, k, l, 1, q((Be + Be * Math.pow(l, Ce)) * Math.pow(ce, l)), q(De * Math.pow(ee, l)), 1 * q(Ee * Math.pow(ge, l)), new Kb(k, g, l, h));
                g = A.a.aa;
                g.Da = !1;
                g.Na = !1
            } else h = A.a.aa,
            !(h.Da || A.a.na.Yb || p() - h.Uc < Fe) && Math.random() < Ge && (h.Da = !0),
            Zd(g.Be)
        }
    }
};
var hb = {
    description: "提高点击伤害",
    e: 1,
    ta: 0.1,
    oa: 1,
    Ka: !0
},
ta = {
    description: "提高队伍CPS",
    e: 1,
    ta: 0.1,
    oa: 1,
    Ka: !0
},
ne = {
    description: "提高战斗经验",
    e: 1,
    ta: 0.1,
    oa: 1,
    Ka: !0
},
je = {
    description: "遭遇战可能遇到更高等级",
    e: 0,
    ta: 0.1,
    oa: 0,
    Ka: !0
},
bb = {
    description: "降低敌人防御",
    e: 1,
    ta: -0.1,
    oa: 1,
    fd: 0.3,
    Ka: !0
},
qe = {
    description: "发现额外黄金",
    e: 1,
    ta: 0.1,
    oa: 1,
    Ka: !0
},
ze = {
    description: "更高几率掉落稀有道具",
    e: 1,
    ta: 0.1,
    oa: 1,
    Ka: !0
},
we = {
    description: "怪物掉落更多道具.",
    e: 1,
    ta: 0.1,
    oa: 1,
    Ka: !0
},
Sd = {
    description: "掉落更高等级道具",
    e: 0,
    ta: 0.1,
    oa: 0,
    Ka: !0
},
Qa = {
    description: "商店补货更频繁",
    e: 1,
    ta: -0.1,
    oa: 1,
    fd: 0.3,
    Ka: !0
},
Vd = {
    description: "降低商店道具售价",
    e: 1,
    ta: -0.1,
    oa: 1,
    fd: 0.3,
    Ka: !0
},
Va = {
    description: "商店出售更多道具",
    e: 0,
    ta: 10,
    oa: 0,
    Ka: !1
},
Xa = {
    description: "更高几率在商店出现稀有道具",
    e: 1,
    ta: -0.1,
    oa: 1,
    fd: 0.3,
    Ka: !0
},
C = [hb, ta, ne, qe, ze, we, Qa, Vd, bb, Va, Xa, je, Sd];
var gb = {
    name: "点击攻击",
    description: "攻击按钮造成200%伤害.",
    e: 1,
    Ca: 2,
    za: 1,
    duration: 12E4,
    Ga: 3E5
},
sa = {
    name: "野蛮暴怒",
    description: "野蛮暴怒增加100%队伍CPS.",
    e: 1,
    Ca: 2,
    za: 1,
    duration: 6E4,
    Ga: 3E5
},
me = {
    name: "圣洁祝福",
    description: "提高战斗经验50%.",
    e: 1,
    Ca: 1.5,
    za: 1,
    duration: 18E4,
    Ga: 3E5
},
pe = {
    name: "财富感应",
    description: "敌人掉落黄金增加40%",
    e: 1,
    Ca: 1.4,
    za: 1,
    duration: 18E4,
    Ga: 48E4
},
ye = {
    name: "义贼之路",
    description: "增加敌人掉落稀有道具概率15%.",
    e: 1,
    Ca: 0.85,
    za: 1,
    duration: 18E4,
    Ga: 3E5
},
ve = {
    name: "专踢屁股",
    description: "怪物掉落道具几率提高30%.",
    e: 1,
    Ca: 1.3,
    za: 1,
    duration: 18E4,
    Ga: 3E5
},
Pa = {
    name: "魅力光环",
    description: "提高商店出现新道具频率.",
    e: 1,
    Ca: 0.5,
    za: 1,
    duration: 36E4,
    Ga: 9E5
},
Ud = {
    name: "恐吓商店",
    description: "商店出现的新道具降价15%.",
    e: 1,
    Ca: 0.85,
    za: 1,
    duration: 18E4,
    Ga: 3E5
},
ab = {
    name: "秘密攻击",
    description: "降低敌人防御25%.",
    e: 1,
    Ca: 0.75,
    za: 1,
    duration: 6E4,
    Ga: 3E5
},
Ua = {
    name: "提升之路",
    description: "下次商店补货出现更多道具.",
    e: 0,
    Ca: 50,
    za: 0,
    duration: 36E4,
    Ga: 6E5
},
Wa = {
    name: "迷人微笑",
    description: "增加商店销售稀有道具几率15%.",
    e: 1,
    Ca: 0.85,
    za: 1,
    duration: 36E4,
    Ga: 6E5
},
ie = {
    name: "最终技能",
    description: "更高几率遇到高等级的遭遇战.",
    e: 0,
    Ca: 0.35,
    za: 0,
    duration: 18E4,
    Ga: 3E5
},
Rd = {
    name: "诉讼本质",
    description: "提高发现高级道具几率15%.",
    e: 0,
    Ca: 0.15,
    za: 0,
    duration: 18E4,
    Ga: 3E5
},
dc = "追踪受害者",
ec = "一路追踪受害者,急速逼近首领巢穴所在地.",
cc = 5E3,
bc = 48E4,
Zb = "魔术魅力",
$b = "商店道具立即补货.",
Yb = 5E3,
Xb = 48E4;
function He() {
    this.Xd = -1;
    window.rg = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(a) {
            window.setTimeout(a, 1E3 / 60)
        }
    } ();
    var a = this;
    this.jg = function() {
        a.Ld()
    }
}
He.prototype.Ld = function() {
    var a = p(); - 1 === this.Xd && (this.Xd = a);
    var b = a - this.Xd;
    this.Xd = a;
    var c = A.jb,
    d, f, g = !1;
    for (d = 0; d < c.hc.length; d++) f = c.hc[d],
    f.G ? f.qb < a && (Vb(f), g = !0) : !f.N && f.qb + Math.max(Sb, f.Tc - A.a.P.ja * Tb) < a && (f.N = !0, c.Qb.push(f), g = !0);
    g && c.bb++;
    if (0 < b && (a = b / 1E3, b = A.ke, !(0 >= a))) {
        c = A.a.c;
        if (b.le) for (d = 0; d < c.length; d++) mc(b, c[d], ra(c[d]) * a, 2 > a);
        else for (d = c.length - 1; 0 <= d; d--) mc(b, c[d], ra(c[d]) * a, 2 > a);
        b.le = !b.le
    }
    a = A.a.S;
    for (b = 0; b < a.Nc.length; b++) c = a.Nc[b],
    !c.wb && c.Xb >= c.Oc && (c.wb = !0, a.yb.push(c), delete a.Nb[c.Wa], a.Oa++);
    a = A.Lb; ( - 1 === a.Ib || p() - a.Ib > a.cg) && Ie(a);
    Oa();
    Ba(A.a.Va);
    a = A.a.nb;
    b = a.items;
    c = 0;
    for (f = p(); c < b.length;) d = b[c],
    d.Ie <= f ? (za(a, c), Ea(d)) : c++;
    a = A.dc;
    for (b = 0; b < a.od.length; b++) a.od[b].g();
    window.rg(this.jg)
};
function Je() {}
function Xc() {
    A.a.P.ja++;
    var a;
    for (a = 0; a < A.a.c.length; a++) {
        var b = A.a.c[a],
        c = A.a.P;
        c.Wc.push(new kb(b.wa, b.O, b.ra, c.ja))
    }
    y("Prestige", "" + A.a.P.ja);
    A.Yd(!1);
    Ie(A.Lb)
}
function yd(a) {
    var b = qc(a);
    A.a.c.push(b);
    A.a.R[b.O] = b;
    ic(b);
    A.dc.f();
    var c = A.a.t;
    Pb(c, a); - 1 !== c.ab.indexOf(a) || A.k[a].Qc || c.ab.push(a);
    c.i === a && (c.i = -1, c.Rb = p());
    c.eb++;
    y("Character", "已加入: " + b.O)
}
function zd(a) {
    a = qc(a);
    var b = A.a.t; - 1 !== b.i && (Pb(b, b.i), -1 !== b.ab.indexOf(b.i) || A.k[b.i].Qc || b.ab.push(b.i), b.i = -1, b.Rb = p());
    y("Character", "被拒绝: " + a.O)
}
Je.prototype.ce = function() {
    var a = pb();
    A.a.S.ce();
    a && y("任务已接受", a.Wa)
};
Je.prototype.Me = function(a) {
    A.a.S.Me(a);
    var b = Ke + r(Le - Ke),
    c;
    c = D();
    var d = c + Me,
    f;
    f = A.Jf;
    var g = c + Ne,
    h = A.a.c[r(A.a.c.length)].i,
    l = r(A.k[h].T.length);
    c = new pa;
    var k = Td(f.Ha(g, 0.01));
    c.w = A.k[h].T[l].d;
    c.dd = l;
    c.H = A.k[h].className;
    c.ub = g;
    c.ed = 40;
    var s = z(Ud, Vd),
    h = Oe * k.n * Math.pow(k.o, g - 1),
    l = 1.05 - 0.1 * Math.random(),
    g = Math.max(1, q(k.p * Math.pow(k.q, g - 1) * s * (1.05 - 0.1 * Math.random())));
    c.ca = g;
    g = Math.max(1, q(h * l));
    c.j = g;
    c.tb = Od(f.Kf, c);
    Ia(c);
    for (f = 0; f < b; f++) c = A.a.c[r(A.a.c.length)],
    c = Ya(c, bd, d),
    Ia(c);
    y("任务奖励", a.Wa)
};
Je.prototype.We = function() {
    A.a.qa.We()
};
function qc(a) {
    var b = new qa,
    c = A.k[a];
    b.Ea = c.ea;
    b.wa = c.F;
    b.O = c.className;
    b.ra = 1;
    b.ld(a);
    b.Fb = Pe;
    a = A.k[b.i];
    for (c = 0; c < a.T.length; c++) {
        var d = b,
        f = a,
        g = c,
        h = f.T[g],
        l = new pa;
        l.w = h.d;
        l.tb = "&lt;空白 " + h.d + " 槽位&gt;";
        l.j = 0;
        l.ub = 0;
        l.dd = g;
        l.Pd = !0;
        l.ca = 0;
        l.ed = 0;
        l.H = f.className;
        F(d, l)
    }
    return b
}
function oe(a) {
    for (var b = a.Fa; b >= a.Fb;) a.Fb += q(Pe * Math.pow(Qe, a.ra)),
    a.ra++,
    A.a.M.Le(a.ra),
    A.a.Cb.Le(a.ra),
    y("等级提升", a.O + " (等级. " + a.ra + ")")
}
function eb() {
    var a = D();
    return q((Re + Re * Math.pow(a - 1, Se)) * Math.pow(Te, a - 1))
}
function Hc(a) {
    if (a && 0 !== a.length) {
        var b, c, d = A.a.M.ya,
        f, g = [];
        for (b = 0; b < a.length; b++)(c = a[b], c.ca > d || !(f = A.a.R[c.H])) || (f = f.Aa[c.w]) && f.j >= c.j || g.push(c);
        if (0 < g.length) if (1 === g.length) c = g[0],
        Ca(c) && (f = A.a.R[c.H], d = A.a.c.indexOf(f), Fc(d, c));
        else for (c = A.a.Y, !g || 2 > g.length || g.sort(c.sg); 0 < g.length && 0 < d;) c = g[0],
        d >= c.ca && Ca(c) && (f = A.a.R[c.H], d = A.a.c.indexOf(f), Fc(d, c), d = A.a.M.ya),
        g.splice(0, 1)
    }
}
function Fc(a, b) {
    var c = A.a.c[a];
    F(c, b);
    var d = A.a.M;
    d.ya -= b.ca;
    0 > d.ya && (d.ya = 0);
    A.a.Y.removeItem(b);
    G(c)
};
function Ue() {
    var a = A.Lb;
    "undefined" != typeof localStorage && localStorage.removeItem(a.Se);
    a.Ib = -1;
    y("SaveManager", "Delete")
}
function Ie(a) {
    var b = Ve();
    b && ("undefined" != typeof localStorage && localStorage.setItem(a.Se, b), a.Ib = p())
}
function We(a) {
    if (a && (a = m.ig(a)) && (a = JSON.parse(a))) {
        A.Yd(!0);
        var b;
        if (b = a.characters) {
            A.a.c.length = 0;
            A.a.R = {};
            var c, d;
            for (c = 0; c < b.length; c++) {
                var f = d = new qa,
                g = b[c];
                f.wa = g.name;
                f.O = g.className;
                f.ra = g.level;
                f.Bc = g.kills;
                f.ld(g.descriptionIndex);
                f.Fb = g.experienceForNextLevel;
                f.Fa = g.experience;
                var h = g.items;
                if (h) for (var l = void 0,
                l = 0; l < h.length; l++) F(f, Xe(h[l]));
                f.Ea = A.k[f.i].ea;
                var h = f.Ea,
                k = g.ability;
                h && k && (g = k.active, l = k.available, k = k.endTime, g || (g = !1), l || (l = !1), k || (k = -1), h.G = g, h.N = l, h.qb = k, -1 !== h.qb || h.G || (h.N = !0));
                G(f);
                A.a.c.push(d);
                A.a.R[d.O] = d
            }
            b = !0
        } else b = !1;
        if (b) {
            if (l = a.partyStatistics) b = A.a.M,
            c = l.gold,
            d = l.clicks,
            f = l.encountersWon,
            h = l.kills,
            g = l.bossKills,
            l = l.experience,
            c && (b.ya = c),
            d && (b.Bd = d),
            f && (b.Vb = f),
            h && (b.Sd = h),
            g && (b.yd = g),
            l && (b.Kd = l);
            if (c = a.store) b = c.minutes,
            c = c.seconds,
            b || (b = 0),
            c || (c = 0),
            A.a.Y.vb = p() + q(6E4 * b + 1E3 * c) - Ra;
            if (b = a.itemCache) for (c = 0; c < b.length; c++)(d = Xe(b[c])) && Ea(d); (b = a.bossLair) ? (c = b.bossStartTime, A.a.aa.Uc = c ? c: p(), c = b.bossLairFound, A.a.aa.Da = c ? c: !1, b = b.bossLairEntered, A.a.aa.Na = b ? b: !1) : A.a.aa.W(); (b = a.dungeon) ? (c = b.dungeonLevel, A.a.na.pc = c ? c: 1, c = b.levelBossDefeated, A.a.na.Yb = c ? c: !1, (b = b.levelName) ? oa(b) : oa(null)) : ma(); (b = a.machinePartCollection) ? (c = b.robotInParty, A.a.K.jd = c ? c: !1, c = b.robotAssembled, A.a.K.Pc = c ? c: !1, c = b.foundPartIndex, A.a.K.Ta = c ? c: -1, (c = b.foundParts) ? Cb(c) : Cb([]), c = b.engineerFound, A.a.K.Hc = c ? c: !1, b = b.machinePartTime, A.a.K.Zb = b ? b: p()) : A.a.K.W();
            if (b = a.defeatedBossCollection) {
                if (b = b.bosses) {
                    c = [];
                    for (d = 0; d < b.length; d++)(g = b[d]) ? (f = g.name, h = g.title, g = g.level, f = f && h && g ? new Kb(f, h, g, !0) : null) : f = null,
                    f && c.push(f);
                    b = c
                } else b = [];
                b ? A.a.kb.hb = b: A.a.kb.W()
            } else A.a.kb.W(); (b = a.endGame) ? (c = b.victorious, A.a.Sa.cc = c ? c: !1, b = b.victoryAcknowledged, A.a.Sa.xc = b ? b: !1) : A.a.Sa.W();
            if (b = a.prestige) {
                if (c = b.prestigeCount) A.a.P.ja = c;
                b = b.champions;
                c = [];
                if (b && 0 < b.length) for (d = 0; d < b.length; d++) l = b[d],
                f = l.championName,
                h = l.championClass,
                g = l.championLevel,
                l = l.partyNumber,
                f && h ? (g || (g = 0), l || (l = 0), f = new kb(f, h, g, l)) : f = null,
                f && c.push(f);
                c && (A.a.P.Wc = c)
            }
            if (b = a.artifactCollection) {
                if (c = b.artifacts) {
                    d = [];
                    for (h = 0; h < c.length; h++)(f = Ye(c[h])) && d.push(f);
                    c = d
                } else c = [];
                c && (d = A.a.qa, d.fb = c, ga(d));
                c = Ye(b.foundArtifact);
                A.a.qa.mb = c ? c: null;
                b = b.foundArtifactTime;
                A.a.qa.qc = b ? b: p()
            }
            if (b = a.questCollection) {
                if (c = Ze(b.quests)) for (d = A.a.S, f = 0; f < c.length; f++) ob(d, c[f]);
                c = $e(b.assignedQuest);
                A.a.S.Bb = c ? c: null;
                c = b.assignedQuestTime;
                A.a.S.Pb = c ? c: p();
                if (b = Ze(b.unrewardedQuests)) A.a.S.yb = b
            }
            if (a = a.encounteredCharacter)(b = a.characterDescriptionIndex) ? A.a.t.ld(b) : A.a.t.ld(0),
            b = a.characterFoundTime,
            A.a.t.Rb = b ? b: p(),
            b = a.addedCharacterCount,
            A.a.t.eb = b ? b: 0,
            (b = a.availableCharacterIndices) || (b = Nb(A.a.t)),
            A.a.t.va = b,
            (a = a.unlockedCharacterIndices) || (a = Ob()),
            A.a.t.ab = a;
            else {
                a = A.a.t;
                a.i = -1;
                a.Rb = p();
                a.va = Nb(a);
                b = 0;
                for (d = 1; d < A.a.c.length; d++) c = A.a.c[d].i,
                A.k[c].Qc || b++;
                a.eb = b;
                a.ab = Ob()
            }
            a = !0
        } else a = !1;
        return a
    }
    return ! 1
}
function Ve() {
    var a = JSON.stringify(af());
    return a ? m.hg(a) : null
}
function af() {
    var a = {
        gold: A.a.M.ya,
        clicks: A.a.M.Bd,
        encountersWon: A.a.M.Vb,
        kills: A.a.M.Sd,
        bossKills: A.a.M.yd,
        experience: A.a.M.Kd
    },
    b,
    c = [];
    for (b = 0; b < A.a.c.length; b++) c.push(bf(A.a.c[b]));
    b = {
        minutes: A.a.Y.Zd,
        seconds: A.a.Y.$d
    };
    var d = A.a.Va.items,
    f, g = [];
    for (f = 0; f < d.length; f++) g.push(cf(d[f]));
    d = {
        bossStartTime: A.a.aa.Uc,
        bossLairFound: A.a.aa.Da,
        bossLairEntered: A.a.aa.Na
    };
    f = {
        dungeonLevel: A.a.na.pc,
        levelBossDefeated: A.a.na.Yb,
        levelName: A.a.na.bd
    };
    var h = {
        robotInParty: H(),
        robotAssembled: zb(),
        foundPartIndex: A.a.K.Ta,
        foundParts: A.a.K.sb,
        engineerFound: yb(),
        machinePartTime: A.a.K.Zb
    },
    l = A.a.kb.hb,
    k = [],
    s;
    for (s = 0; s < l.length; s++) {
        var n = l[s];
        k.push({
            name: n.gf,
            title: n.rc(),
            level: n.fg
        })
    }
    l = {
        bosses: k
    };
    k = {
        victorious: A.a.Sa.cc,
        victoryAcknowledged: A.a.Sa.xc
    };
    s = A.a.P.ja;
    var n = A.a.P.Wc,
    u = [],
    t;
    if (n && 0 < n.length) for (t = 0; t < n.length; t++) {
        var v = n[t];
        u.push({
            championName: v.kf,
            championClass: v.hf,
            championLevel: v.jf,
            partyNumber: v.Tf
        })
    }
    s = {
        prestigeCount: s,
        champions: u
    };
    if (n = ia()) {
        t = [];
        for (u = 0; u < n.length; u++) t.push(df(n[u]));
        n = t
    } else n = [];
    n = {
        artifacts: n,
        foundArtifact: df(A.a.qa.mb),
        foundArtifactTime: A.a.qa.qc
    };
    u = {
        quests: ef(qb()),
        assignedQuest: ff(pb()),
        assignedQuestTime: A.a.S.Pb,
        unrewardedQuests: ef(A.a.S.yb)
    };
    return {
        partyStatistics: a,
        characters: c,
        store: b,
        itemCache: g,
        bossLair: d,
        dungeon: f,
        machinePartCollection: h,
        defeatedBossCollection: l,
        endGame: k,
        prestige: s,
        artifactCollection: n,
        questCollection: u,
        encounteredCharacter: {
            characterDescriptionIndex: A.a.t.i,
            characterFoundTime: A.a.t.Rb,
            addedCharacterCount: A.a.t.eb,
            availableCharacterIndices: A.a.t.va,
            unlockedCharacterIndices: A.a.t.ab
        }
    }
}
function ef(a) {
    var b = [],
    c;
    for (c = 0; c < a.length; c++) b.push(ff(a[c]));
    return b
}
function Ze(a) {
    if (!a) return [];
    var b = [],
    c,
    d;
    for (d = 0; d < a.length; d++)(c = $e(a[d])) && b.push(c);
    return b
}
function ff(a) {
    return a ? {
        baseName: a.Wa,
        requiredKills: a.Oc,
        killCount: a.Xb,
        questComplete: a.wb
    }: null
}
function $e(a) {
    if (!a) return null;
    var b = a.baseName,
    c = a.requiredKills,
    d = a.killCount;
    a = a.questComplete;
    if (!b) return null;
    c || (c = ub);
    d || (d = 0);
    a || (a = !1);
    b = new mb(b, c);
    b.Xb = d;
    b.wb = a;
    return b
}
function df(a) {
    return a ? {
        artifactName: a.ee,
        artifactSettingsIndex: a.fe
    }: null
}
function Ye(a) {
    if (!a) return null;
    var b = a.artifactName;
    a = a.artifactSettingsIndex;
    if (!b) return null;
    a || (a = 0);
    return new ba(b, a)
}
function bf(a) {
    var b = a.wa,
    c = a.O,
    d = a.ra,
    f = a.Bc,
    g = a.Fa,
    h = a.Fb,
    l = a.i,
    k = [],
    s = a.items,
    n;
    for (n = 0; n < s.length; n++) k.push(cf(s[n]));
    a = a.Ea;
    return {
        name: b,
        className: c,
        level: d,
        kills: f,
        experience: g,
        experienceForNextLevel: h,
        descriptionIndex: l,
        items: k,
        ability: {
            active: a.G,
            available: a.N,
            endTime: a.qb
        }
    }
}
function Xe(a) {
    var b = new pa;
    b.w = a.baseName;
    b.tb = a.generatedName;
    b.dd = a.descriptionIndex;
    b.H = a.characterClassName;
    b.j = a.cps;
    b.ed = a.itemQuality;
    b.ub = a.itemLevel;
    b.ca = a.purchaseCost;
    b.Pd = a.placeholder;
    return b
}
function cf(a) {
    return {
        baseName: a.w,
        generatedName: a.tb,
        descriptionIndex: a.dd,
        characterClassName: a.H,
        cps: a.j,
        itemQuality: a.Ha(),
        itemLevel: a.ub,
        purchaseCost: a.ca,
        placeholder: a.Pd
    }
};
var Re = 60,
Te = 1.02,
Se = 1.6,
Ta = 20,
Ra = 3E5,
Sb = 0,
Ga = 2,
Tb = 3E4,
ua = 0.1,
fa = 3,
Fa = 6,
ja = 6E4,
ka = 0.3,
rb = 6E4,
sb = 0.3,
ub = 100,
wb = 20,
vb = 5,
Me = 3,
Ke = 10,
Le = 15,
Ib = 6E4,
Jb = 0.3,
bd = 0.5,
ad = 3,
Zc = 10,
$c = 20,
La = 6E3,
Ma = 45E3,
Ja = 20,
Dd = 7,
Ed = 6,
Pe = 230,
Qe = 1.17,
xd = 5,
re = 24E4,
se = 0.3,
$d = 5,
fe = 1.5,
ge = 1.05,
ae = 100,
be = 1.9,
ce = 1.015,
de = 2,
ee = 1.133,
Ae = 0.1,
Fe = 24E4,
Ge = 0.2,
xe = 0.35,
Ee = 50,
Be = 5E3,
Ce = 2.2,
De = 100,
te = 15,
ue = 30,
he = [{
    J: "奴隶监工",
    L: 5
},
{
    J: "地下城领班",
    L: 7
},
{
    J: "项目经理",
    L: 9
},
{
    J: "业务经理",
    L: 11
},
{
    J: "中层管理",
    L: 13
},
{
    J: "区域经理",
    L: 15
},
{
    J: "法人走狗",
    L: 17
},
{
    J: "地区经理",
    L: 19
},
{
    J: "怪物事务主管",
    L: 21
},
{
    J: "采矿主管",
    L: 23
},
{
    J: "怪物资源主任",
    L: 25
},
{
    J: "道具制造主管",
    L: 27
},
{
    J: "道具工程主管",
    L: 29
},
{
    J: "研发主管",
    L: 31
},
{
    J: "公共关系主管",
    L: 33
},
{
    J: "销售副总裁",
    L: 35
},
{
    J: "营销副总裁",
    L: 37
},
{
    J: "黄金收购副总裁",
    L: 39
},
{
    J: "通信副总裁",
    L: 41
},
{
    J: "首席财务官",
    L: 43
},
{
    J: "首席运营官",
    L: 45
},
{
    J: "董事长",
    L: 47
},
{
    J: "首席执行官",
    L: 49
},
{
    J: "董事会",
    L: 51
},
{
    J: "董事会主席",
    L: 53
}],
Xd = [{
    A: 2,
    B: [0.55, 0.365, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 5,
    B: [0.45, 0.395, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 8,
    B: [0.35, 0.345, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 11,
    B: [0.2, 0.295, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 14,
    B: [0.15, 0.195, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 17,
    B: [0.1, 0.145, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 20,
    B: [0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 23,
    B: [0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 26,
    B: [0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 29,
    B: [0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 32,
    B: [0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 35,
    B: [0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 38,
    B: [0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 41,
    B: [0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 44,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 47,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 50,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 53,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 56,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 59,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 62,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 65,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 68,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 71,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 74,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 77,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 80,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.045, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01, 0.005]
},
{
    A: 80,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.05, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02, 0.01]
},
{
    A: Number.MAX_VALUE,
    B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.06, 0.1, 0.1, 0.1, 0.15, 0.2, 0.15, 0.07, 0.05, 0.02]
}],
Wd = [{
    s: 0,
    n: 3,
    o: 1.015,
    q: 1.015,
    p: 3
},
{
    s: 1,
    n: 27,
    o: 1.015,
    q: 1.015,
    p: 27
},
{
    s: 2,
    n: 71,
    o: 1.015,
    q: 1.015,
    p: 71
},
{
    s: 3,
    n: 143,
    o: 1.015,
    q: 1.015,
    p: 143
},
{
    s: 4,
    n: 241,
    o: 1.015,
    q: 1.015,
    p: 241
},
{
    s: 5,
    n: 403,
    o: 1.015,
    q: 1.015,
    p: 403
},
{
    s: 6,
    n: 607,
    o: 1.015,
    q: 1.015,
    p: 607
},
{
    s: E,
    n: 871,
    o: 1.015,
    q: 1.015,
    p: 871
},
{
    s: 8,
    n: 1203,
    o: 1.015,
    q: 1.015,
    p: 1203
},
{
    s: 9,
    n: 1611,
    o: 1.015,
    q: 1.015,
    p: 1611
},
{
    s: 10,
    n: 2103,
    o: 1.015,
    q: 1.015,
    p: 2103
},
{
    s: 11,
    n: 2687,
    o: 1.015,
    q: 1.015,
    p: 2687
},
{
    s: 12,
    n: 3371,
    o: 1.015,
    q: 1.015,
    p: 3371
},
{
    s: 13,
    n: 4163,
    o: 1.015,
    q: 1.015,
    p: 4163
},
{
    s: 14,
    n: 5071,
    o: 1.015,
    q: 1.015,
    p: 5071
},
{
    s: 15,
    n: 6103,
    o: 1.015,
    q: 1.015,
    p: 6103
},
{
    s: 16,
    n: 7267,
    o: 1.015,
    q: 1.015,
    p: 7267
},
{
    s: 17,
    n: 8571,
    o: 1.015,
    q: 1.015,
    p: 8571
},
{
    s: 18,
    n: 10023,
    o: 1.015,
    q: 1.015,
    p: 10023
},
{
    s: 19,
    n: 11631,
    o: 1.015,
    q: 1.015,
    p: 11631
},
{
    s: 20,
    n: 13403,
    o: 1.015,
    q: 1.015,
    p: 13403
},
{
    s: 21,
    n: 15347,
    o: 1.015,
    q: 1.015,
    p: 15347
},
{
    s: 22,
    n: 17471,
    o: 1.015,
    q: 1.015,
    p: 17471
},
{
    s: 23,
    n: 19783,
    o: 1.015,
    q: 1.015,
    p: 19783
},
{
    s: 24,
    n: 22291,
    o: 1.015,
    q: 1.015,
    p: 22291
},
{
    s: 25,
    n: 25003,
    o: 1.015,
    q: 1.015,
    p: 25003
},
{
    s: 26,
    n: 27927,
    o: 1.015,
    q: 1.015,
    p: 27927
},
{
    s: 27,
    n: 31071,
    o: 1.015,
    q: 1.015,
    p: 31071
},
{
    s: 28,
    n: 34443,
    o: 1.015,
    q: 1.015,
    p: 34443
},
{
    s: 29,
    n: 38051,
    o: 1.015,
    q: 1.015,
    p: 38051
},
{
    s: 30,
    n: 41903,
    o: 1.015,
    q: 1.015,
    p: 41903
},
{
    s: 31,
    n: 46007,
    o: 1.015,
    q: 1.015,
    p: 46007
}],
Ne = 6,
Oe = 1.3,
Eb = 6E4,
Fb = 0.3,
Bb = [{
    ia: "复杂的机构",
    ka: "在破碎的尸体,成堆的黄金和贵重物品中,你找到一种极其难以理解的复杂机构."
},
{
    ia: "难以辨认的电路",
    ka: "当你在那个刚挂掉,遍身鲜血,体无完肤的受害者身上摸摸索索的时候(我猜也许你是在搜索金币),你找到了一小块不知道有什么用途的电路图。"
},
{
    ia: "奇怪的附属物",
    ka: "你从成堆的尸体中发现一个奇怪的附属物."
},
{
    ia: "润滑的齿轮",
    ka: "在满地的黄金中,你发现了几个润滑的齿轮."
},
{
    ia: "散乱的电线",
    ka: "在那个刚刚被你斩首的敌人尸体后面,你看到了一团杂乱的电线掉在了地上.你的直觉告诉你,你已经找到了某样东西的三分之一,不过究竟是什么呢?"
},
{
    ia: "粘性的液体",
    ka: "你发现,敌人携带的机器上渗出一些东西,一种黏黏的液体."
},
{
    ia: "抛光的外壳",
    ka: "放在房间中间的工作台,有一件被抛光的金属,使你想起一种大型甲壳类动物."
},
{
    ia: "闪亮的螺栓",
    ka: "在箱子底部,你发现一些敌人藏进去的东西,一些闪亮的螺栓."
},
{
    ia: "奇怪的管子",
    ka: "在房间后面的一个架子上,你发现了一些奇怪的电子管.你觉得它们看起来像是组成某样东西的其中一半.你也搞不明白为什么你会有这样的感觉."
},
{
    ia: "神秘的量规",
    ka: "有一个装置被遗漏在角落里了.它的上面写满了神秘的符号,似乎是某种测量仪器.看起来它似乎能和你之前找到的某些东西一起组装起来."
},
{
    ia: "神秘的适配器",
    ka: "在敌人的血肉中摸索,这种事你已经做了很多了,你发现一个神秘的适配器."
},
{
    ia: "混杂的电机",
    ka: "对于这个你所发现的机械装置,你绞尽脑汁也没有搞明白它的原理和用途.唯一你能够确定的是,它应该是一个发动机."
},
{
    ia: "复杂的调节器",
    ka: "你又一次遇到复杂的机械件.你几乎没发现他,因为实在是太复杂了."
},
{
    ia: "连接器支架",
    ka: "你在桌上发现了一个有用的连接器支架组.你意识到你几乎已经发现了所有的机械零件.几乎所有."
},
{
    ia: "奇异的链轮",
    ka: "你在箱子底部发现一系列奇怪的链轮."
},
{
    ia: "复杂的传感器",
    ka: "你困惑地看着这个复杂的小装置,你发现你只知道这是一种传感器."
},
{
    ia: "沉重的电池",
    ka: "你在倒下的敌人的肠子和断肢下发现了沉重的电池."
}];
var A = {
    Ld: new He,
    Jf: new Qd,
    De: new
    function() {
        this.Cf = "天使;成年蛆虫;弓箭手;会计师;代理商;纵火犯;食蚁动物;兔子;獾;公猪;狒狒;熊;主教;甲壳虫;蛇怪;主祭;土匪;盗贼;海妖;观众;巨兽;鬼怪;长毛巨足人;野蛮人;小鸡;独眼巨人;凯米拉;鳄鱼;蟋蟀;变色龙;毛驴;侏儒;魔鬼;半神人;恶魔;树妖;刽子手;巫师;青蛙;冤家;巨蚁;鬼魂;地精;哥布林;囊鼠;巨人;戈耳工;狮鹫;石像鬼;食尸鬼;机器人;鹰身女妖;九头蛇;地狱猎犬;黄蜂;舞女;女巫;嬉皮士;亿库纳;小精灵;海怪;马形水鬼;陆地章鱼;巫妖王;海中巨兽;蜥蜴;图书管理员;水蛭;律师;非专业人士;呓语者;美杜莎;狮身人面像;弥诺陶;木乃伊;模仿者;干尸;送葬者;美人鱼;泥虫;兽人;杂种狗;仙女;茄属植物;亡灵巫师;食人魔;半兽人;帕萨姆;幻影;收割者;蛇;骷髅;蜘蛛;鼻涕虫;学生;巨蛇;大脚野人;泥怪;光头党;丝光鸡;狙击手;巫师;女妖;斯芬克斯;蟾蜍;食人妖;小偷;独角兽;吸血鬼;黄鼠狼;袋熊;狼;马蜂;毒蟾蜍;河狸;考拉;果蝇;术士;魔术师;座狼;双足飞龙;生魂;魔女;战士;雪人;狂热者;僵尸".split(";");
        this.Id = "沉溺的;惊人的;腐坏的;敏捷的;好斗的;冷漠的;愤怒的;敌对的;弯曲的;狡猾的;对抗的;可恶的;讨厌的;血腥的;沉思的;勇敢的;无耻的;破碎的;基础的;漂亮的;对抗的;聪明的;诅咒的;谴责的;神秘的;恐怖的;懦弱的;刻薄的;混乱的;天上的;黑暗的;恐惧的;不满的;失宠的;贫穷的;伪装的;喝醉的;悲惨的;卑鄙的;恶心的;不安的;羞辱的;宅男的;著名的;绝望的;可憎的;开除的;兴奋的;进取的;可怕的;冰冻的;火焰的;惊恐的;可怕的;有爱的;恶魔的;友善的;吓人的;皮毛的;堕落的;虚弱的;冻结的;传说的;凶猛的;未来的;狂乱的;疯狂的;可怕的;预感的;强大的;遗忘的;残忍的;阴森的;郁闷的;惊人的;催眠的;可憎的;错误的;肮脏的;无瑕的;沉醉的;难耐的;智能的;无礼的;缺陷的;监禁的;发炎的;讨厌的;不朽的;险恶的;无情的;厚重的;高尚的;噩梦的;有序的;失格的;卑劣的;丑恶的;资深的;浮华的;投机的;冒险的;掠夺的;阶段的;多产的;幽默的;性感的;邪门的;悚然的;特殊的;灭魂的;狂暴的;浮夸的;严肃的;机密的;阴影的;卑鄙的;反感的;矛盾的;威胁的;糟糕的;浑浊的;高耸的;不幸的;离群的;不正的;无益的;倔强的;亵渎的;无道的;缺德的;无德的;不死的;过去的;呆板的".split(";");
        this.Jd = "遗弃的 美丽的 破碎的 燃烧的 反叛的 贫瘠的 痛苦的 血液的 血腥的 困扰的 毁坏的 结晶的 寒冷的 死亡的 深渊的 黑暗的 雾霾的 遥远的 烦扰的 荒凉的 发狂的 潮湿的 矮胖的 恶心的 不安的 发狂的 乌木的 冻结的 孤单的 忘却的 禁止的 畏惧的 金典的 黑暗的 潮湿的 感染的 绝命的 迷失的 残忍的 神秘的 模糊的 幽冥的 美好的 就近的 肮脏 顽皮的 普通的 北方的 苍白的 污染的 粉碎的 阴影的 秘密的 覆盖的 痛苦的 悲伤地 折磨的 虐待的 亵渎的 未知的 无名的 卑鄙的 窃语的".split(" ");
        this.Wd = "学院;沼泽;废矿;洞穴;地穴;城市;山洞;峡谷;黑暗;领域;地牢;次元;区域;梦想;帝国;森林;工厂;墓地;洞穴;地狱;山谷;地狱景象;阴间;王国;国土;图书馆;沼泽;陵墓;太平间;泥泞平原;附近;位面;省;大门;行星;领域;过往;坑;宫殿;河流;河流水域;丛林;沼泽;屠宰场;郊外;冻土;地形;坟墓;寺庙;塔;地底".split(";");
        this.dg = "全能;傲慢;讨厌;贫血;狂战;暴食;反叛;碎骨;破环;残忍;嗜血;狂虐;粉碎;疯狂;破坏;毁灭;狂乱;恶心;干扰;统治;杀人;发狂;堕落;死神;畏惧;可怕;孤寡;遗忘;凶狠;奇迹;庞大;贪婪;宏大;伟大;无心;有害;凶杀;不洁;穿刺;感染;轻率;节制;无敌;乏味;难耐;无礼;意外;无暇;猛击;欢愉;嘲弄;嗜杀;懒惰;淫荡;卑鄙;发臭;威猛;吸吮;殘忍;杀气;恶意;恶搞;管事;低劣;肮脏;淘气;痴呆;丰富;制裁;痛苦;玷污;无情;野蛮;虐待;糟糕;残暴;暴君;沉闷;邪恶;排他;独立;无情;不公;无趣;毒邪;仇恨;复仇;暴力;恶毒;卑鄙".split(";");
        this.Zc = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许".split("");
        this.Ze = ["轩", "陆", "丹", "海", "佑"];
        this.Af = "渊 鲁 辕 东 火 南 法 古 德".split(" ")
    },
    bg: new
    function() {
        this.ef = "护身符;骨骼;手镯;书册;银币;圣杯;爪子;宝石;雕刻;权冠;匕首;蚀刻;徽章;雕像;金牙;酒杯;耳环;号角;偶像;小刀;面具;项链;羊皮纸;陶器;卷轴;颅骨;啤酒杯;图腾;饰品;法宝;药瓶;花瓶".split(";");
        this.bf = "远古的 古代的 星光的 老化的 过时的 祝福的 腐败的 邪恶的 罪恶的 神圣的 圣洁的 优雅的 遗忘的 禁止的 祖传的 神秘的 恶毒的 稀有的 幽灵的 纯洁的 认可的 心爱的 陈旧的 非常的 独特的 恶略的".split(" ")
    },
    Fe: new Je,
    input: new kc,
    ke: new
    function() {
        this.Be = new Yd;
        this.Yf = new ke;
        this.le = !0
    },
    Lb: new
    function() {
        this.Se = "末日危机_V0.010";
        this.Ib = -1;
        this.cg = 6E4
    },
    dc: new Fd,
    jb: new fc,
    k: [{
        className: "鼠标",
        ma: !1,
        F: "吱吱",
        description: "提高手动(攻击按钮)攻击伤害.",
        ea: new J(gb),
        T: [{
            d: "鼠标左键"
        },
        {
            d: "鼠标右键"
        },
        {
            d: "鼠标滚轮"
        },
        {
            d: "USB电子狗"
        },
        {
            d: "鼠标垫"
        }]
    },
    {
        className: "野蛮人",
        ma: !1,
        F: "拉哥",
        description: "野蛮人的愤怒可以增加队伍CPS一小段时间.",
        ea: new J(sa),
        T: [{
            d: "斧子"
        },
        {
            d: "护腕"
        },
        {
            d: "护胸甲"
        },
        {
            d: "头盔"
        },
        {
            d: "胡须"
        }]
    },
    {
        className: "圣骑士",
        ma: !1,
        F: "雨果",
        description: "魅力光环可以增加店里出现新道具的频率.",
        ea: new J(Pa),
        T: [{
            d: "剑"
        },
        {
            d: "护盾"
        },
        {
            d: "护胸甲"
        },
        {
            d: "头盔"
        },
        {
            d: "靴子"
        }]
    },
    {
        className: "游侠",
        ma: !1,
        F: "艾丽",
        description: "跟踪技能增加和高级别的敌人战斗的机会.",
        ea: new J(ie),
        T: [{
            d: "弓"
        },
        {
            d: "箭袋"
        },
        {
            d: "飞刀"
        },
        {
            d: "皮革护甲"
        },
        {
            d: "宠物猎鹰"
        }]
    },
    {
        className: "牧师",
        ma: !1,
        F: "艾丝美拉达",
        description: "调用神圣祝福增加获得战斗经验.",
        ea: new J(me),
        T: [{
            d: "权杖"
        },
        {
            d: "纪念品"
        },
        {
            d: "护身符"
        },
        {
            d: "卷轴"
        },
        {
            d: "斗篷"
        }]
    },
    {
        className: "巫师",
        ma: !1,
        F: "凯恩",
        description: "法师的法术可以让商店直接进货.",
        ea: new Wb,
        T: [{
            d: "魔棒"
        },
        {
            d: "法术书"
        },
        {
            d: "戒指"
        },
        {
            d: "帽子"
        },
        {
            d: "长袍"
        }]
    },
    {
        className: "海盗",
        ma: !1,
        F: "斯派洛",
        description: "敌人会掉落更多黄金.",
        ea: new J(pe),
        T: [{
            d: "铁钩"
        },
        {
            d: "弯刀"
        },
        {
            d: "眼罩"
        },
        {
            d: "鹦鹉"
        },
        {
            d: "燧发火枪"
        }]
    },
    {
        className: "特警",
        ma: !1,
        F: "列尼",
        description: "恐吓商店主人进行降价.",
        ea: new J(Ud),
        T: [{
            d: "手枪"
        },
        {
            d: "意大利西服"
        },
        {
            d: "皮鞋"
        },
        {
            d: "护发产品"
        },
        {
            d: "手表"
        }]
    },
    {
        className: "小偷",
        ma: !1,
        F: "凯西",
        description: "提高敌人掉落稀有道具的概率.",
        ea: new J(ye),
        T: [{
            d: "撬锁工具"
        },
        {
            d: "匕首"
        },
        {
            d: "手套"
        },
        {
            d: "飞镖"
        },
        {
            d: "绳索"
        }]
    },
    {
        className: "忍者",
        ma: !1,
        F: "明治",
        description: "秘密攻击可以降低敌人防御.",
        ea: new J(ab),
        T: [{
            d: "忍者刀"
        },
        {
            d: "飞镖"
        },
        {
            d: "爪钩"
        },
        {
            d: "手爪"
        },
        {
            d: "面具"
        }]
    },
    {
        className: "枪手",
        ma: !1,
        F: "凯尔",
        description: "迷人的微笑可以说服商店店主提供更好的道具.",
        ea: new J(Wa),
        T: [{
            d: "牛仔帽"
        },
        {
            d: "六发左轮"
        },
        {
            d: "枪套"
        },
        {
            d: "抹布"
        },
        {
            d: "皮带扣"
        }]
    },
    {
        className: "军团士兵",
        ma: !1,
        F: "迪史密斯",
        description: "通过改良增加商店里道具的数量.",
        ea: new J(Ua),
        T: [{
            d: "罗马短剑"
        },
        {
            d: "标枪"
        },
        {
            d: "凉鞋"
        },
        {
            d: "油渣"
        },
        {
            d: "黑醋粟甜酒"
        }]
    },
    {
        className: "律师",
        ma: !1,
        F: "彼得",
        description: "诉讼力增加发现高级道具的几率.",
        ea: new J(Rd),
        T: [{
            d: "领带"
        },
        {
            d: "公文包"
        },
        {
            d: "马甲"
        },
        {
            d: "名片"
        },
        {
            d: "雪茄"
        }]
    },
    {
        className: "啦啦队长",
        ma: !1,
        F: "索菲",
        description: "可以从遭遇战中获得额外的道具.",
        ea: new J(ve),
        T: [{
            d: "啦啦球"
        },
        {
            d: "扩音器"
        },
        {
            d: "发带"
        },
        {
            d: "百褶裙"
        },
        {
            d: "手机"
        }]
    },
    {
        className: "机器人",
        ma: !0,
        Qc: !0,
        F: "屠杀号-7",
        description: "机器人热衷于杀光人类(和其他所有东西).",
        ea: new ac,
        T: [{
            d: "格特林机枪附件"
        },
        {
            d: "链锯附件"
        },
        {
            d: "怜悯消除单元"
        },
        {
            d: "可惜消除模块"
        },
        {
            d: "恶意软件"
        }]
    }],
    a: {
        Eb: new Za,
        M: new la,
        c: [],
        R: {},
        Y: new Na,
        nb: new Ha,
        Va: new Da,
        Cb: new cb,
        aa: new ib,
        na: new
        function() {
            this.pc = 1;
            this.bd = "地下城";
            this.Yb = !1;
            this.Ae = new Gd
        },
        K: new xb,
        kb: new Lb,
        bc: new Gb,
        Sa: new jb,
        P: new lb,
        qa: new ca,
        S: new nb,
        t: new Mb
    },
    handleKeyPress: function(a) {
        A.input.handleKeyPress(a)
    },
    displayEncounterTab: function() {
        U(0)
    },
    displayMachinePartsTab: function() {
        U(1)
    },
    displayArtifactsTab: function() {
        U(2)
    },
    displayQuestsTab: function() {
        U(3)
    },
    displayDefeatedBossesTab: function() {
        U(4)
    },
    displayChampionsTab: function() {
        U(5)
    },
    displayManagementTab: function() {
        U(6)
    },
    displayVersionTab: function() {
        U(7)
    },
    displayCharacter: function(a) {
        A.input.displayCharacter(a)
    },
    onAttackButtonPress: function() {
        A.input.onAttackButtonPress()
    },
    onSaveGameButtonPress: function() {
        Ie(A.Lb)
    },
    onExportSaveButtonPress: function() {
        var a = K("exportSaveInput");
        a.value = Ve();
        R("exportSaveContainer");
        Q("exportSaveButton");
        a.select()
    },
    onImportSaveButtonPress: function() {
        Q("importErrorMessage");
        Q("importSuccessMessage");
        K("importSaveInput").value = "";
        R("importSaveContainer");
        Q("importSaveButton")
    },
    Yd: function(a) {
        A.a.c = [];
        A.a.R = {};
        A.a.M = new la;
        A.a.Eb = new Za;
        db();
        A.a.aa = new ib;
        ma();
        A.a.K = new xb;
        A.a.kb = new Lb;
        var b = A.a.bc;
        b.ic = !1;
        b.Dc = p();
        da(A.a.qa, a);
        A.a.S.Re();
        b = A.a.t;
        b.eb = 0;
        b.i = -1;
        b.Rb = p();
        b.va = Nb(b);
        b.ab = Ob();
        A.a.Sa.Re();
        wa(A.a.nb);
        wa(A.a.Va);
        wa(A.a.Y);
        a && (A.a.P = new lb)
    },
    onExportCloseButtonPress: function() {
        Q("exportSaveContainer");
        R("exportSaveButton");
        K("exportSaveInput").value = ""
    },
    onImportOkButtonPress: function() {
        var a = K("importSaveInput").value;
        y("SaveManager", "Import");
        We(a) ? (hc(A.jb), A.dc.f(), Ie(A.Lb), Q("importErrorMessage"), R("importSuccessMessage")) : (R("importErrorMessage"), Q("importSuccessMessage"))
    },
    onImportCloseButtonPress: function() {
        Q("importErrorMessage");
        Q("importSuccessMessage");
        K("importSaveInput").value = "";
        Q("importSaveContainer");
        R("importSaveButton")
    },
    setSelectedTabId: function(a) {
        A.input.setSelectedTabId(a)
    },
    pg: function() {
        Y(new nc);
        Y(new Rc);
        Y(new Vc);
        Y(new Lc);
        Y(new Sc);
        Y(new Tc);
        Y(new md);
        Y(new Yc);
        Y(new nd);
        Y(new od);
        Y(new vd);
        Y(new id);
        Y(new ld);
        Y(new cd);
        Y(new fd);
        Y(new gd);
        Y(new wd);
        Y(new Ad);
        var a;
        for (a = 0; a < Dd; a++) Y(new Kc(a));
        Y(new pd);
        Y(new qd)
    },
    onFirstResetGameButtonPress: function() {
        R("resetConfirmContainer");
        Q("firstResetButtonContainer")
    },
    onResetCloseButtonPress: function() {
        Q("resetConfirmContainer");
        R("firstResetButtonContainer")
    },
    onResetGameButtonPress: function() {
        A.Yd(!1);
        Ue();
        Ie(A.Lb);
        gc(A.jb);
        Q("resetConfirmContainer");
        R("firstResetButtonContainer")
    },
    onFirstDeleteSaveButtonPress: function() {
        R("deleteSaveConfirmContainer");
        Q("firstDeleteSaveButtonContainer")
    },
    onDeleteCloseButtonPress: function() {
        Q("deleteSaveConfirmContainer");
        R("firstDeleteSaveButtonContainer")
    },
    onDeleteSaveButtonPress: function() {
        A.Yd(!0);
        Ue();
        Ie(A.Lb);
        gc(A.jb);
        Q("deleteSaveConfirmContainer");
        R("firstDeleteSaveButtonContainer")
    },
    onLoad: function() {
        var a = A.Lb;
        "undefined" != typeof localStorage && We(localStorage.getItem(a.Se));
        y("SaveManager", "Load");
        Oa();
        A.pg();
        0 < A.a.c.length && (hc(A.jb), A.dc.f());
        rc();
        A.Ld.Ld()
    }
};
window.Game = A;
window.$ = "nothing";