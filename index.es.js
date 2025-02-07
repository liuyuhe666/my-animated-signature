/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, I = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, j = Symbol(), V = /* @__PURE__ */ new WeakMap();
let t1 = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== j) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (I && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = V.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && V.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const h1 = (n) => new t1(typeof n == "string" ? n : n + "", void 0, j), a1 = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((s, i, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[o + 1], n[0]);
  return new t1(t, n, j);
}, l1 = (n, e) => {
  if (I) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = H.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, n.appendChild(s);
  }
}, W = I ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return h1(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: d1, defineProperty: c1, getOwnPropertyDescriptor: u1, getOwnPropertyNames: p1, getOwnPropertySymbols: f1, getPrototypeOf: $1 } = Object, _ = globalThis, q = _.trustedTypes, _1 = q ? q.emptyScript : "", R = _.reactiveElementPolyfillSupport, w = (n, e) => n, D = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? _1 : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, s1 = (n, e) => !d1(n, e), J = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: s1 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class y extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = J) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && c1(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: o } = u1(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(r) {
      const l = i == null ? void 0 : i.call(this);
      o.call(this, r), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? J;
  }
  static _$Ei() {
    if (this.hasOwnProperty(w("elementProperties"))) return;
    const e = $1(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(w("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(w("properties"))) {
      const t = this.properties, s = [...p1(t), ...f1(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, i] of t) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) t.unshift(W(i));
    } else e !== void 0 && t.push(W(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return l1(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostConnected) == null ? void 0 : s.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostDisconnected) == null ? void 0 : s.call(t);
    });
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$EC(e, t) {
    var o;
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : D).toAttribute(t, s.type);
      this._$Em = e, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), l = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : D;
      this._$Em = i, this[i] = l.fromAttribute(t, r.type), this._$Em = null;
    }
  }
  requestUpdate(e, t, s) {
    if (e !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(e)), !(s.hasChanged ?? s1)(this[e], t)) return;
      this.P(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(e, t, s) {
    this._$AL.has(e) || this._$AL.set(e, t), s.reflect === !0 && this._$Em !== e && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(e);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, r] of i) r.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], r);
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(t)) : this._$EU();
    } catch (i) {
      throw e = !1, this._$EU(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((t) => this._$EC(t, this[t]))), this._$EU();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[w("elementProperties")] = /* @__PURE__ */ new Map(), y[w("finalized")] = /* @__PURE__ */ new Map(), R == null || R({ ReactiveElement: y }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis, T = C.trustedTypes, K = T ? T.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, i1 = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, n1 = "?" + $, A1 = `<${n1}>`, g = document, P = () => g.createComment(""), x = (n) => n === null || typeof n != "object" && typeof n != "function", Z = Array.isArray, m1 = (n) => Z(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", k = `[ 	
\f\r]`, b = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, F = /-->/g, G = />/g, A = RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Q = /'/g, X = /"/g, r1 = /^(?:script|style|textarea|title)$/i, g1 = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), y1 = g1(1), E = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), Y = /* @__PURE__ */ new WeakMap(), m = g.createTreeWalker(g, 129);
function o1(n, e) {
  if (!Z(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return K !== void 0 ? K.createHTML(e) : e;
}
const E1 = (n, e) => {
  const t = n.length - 1, s = [];
  let i, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = b;
  for (let l = 0; l < t; l++) {
    const h = n[l];
    let d, u, a = -1, p = 0;
    for (; p < h.length && (r.lastIndex = p, u = r.exec(h), u !== null); ) p = r.lastIndex, r === b ? u[1] === "!--" ? r = F : u[1] !== void 0 ? r = G : u[2] !== void 0 ? (r1.test(u[2]) && (i = RegExp("</" + u[2], "g")), r = A) : u[3] !== void 0 && (r = A) : r === A ? u[0] === ">" ? (r = i ?? b, a = -1) : u[1] === void 0 ? a = -2 : (a = r.lastIndex - u[2].length, d = u[1], r = u[3] === void 0 ? A : u[3] === '"' ? X : Q) : r === X || r === Q ? r = A : r === F || r === G ? r = b : (r = A, i = void 0);
    const f = r === A && n[l + 1].startsWith("/>") ? " " : "";
    o += r === b ? h + A1 : a >= 0 ? (s.push(d), h.slice(0, a) + i1 + h.slice(a) + $ + f) : h + $ + (a === -2 ? l : f);
  }
  return [o1(n, o + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let o = 0, r = 0;
    const l = e.length - 1, h = this.parts, [d, u] = E1(e, t);
    if (this.el = U.createElement(d, s), m.currentNode = this.el.content, t === 2 || t === 3) {
      const a = this.el.content.firstChild;
      a.replaceWith(...a.childNodes);
    }
    for (; (i = m.nextNode()) !== null && h.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const a of i.getAttributeNames()) if (a.endsWith(i1)) {
          const p = u[r++], f = i.getAttribute(a).split($), O = /([.?@])?(.*)/.exec(p);
          h.push({ type: 1, index: o, name: O[2], strings: f, ctor: O[1] === "." ? b1 : O[1] === "?" ? w1 : O[1] === "@" ? C1 : N }), i.removeAttribute(a);
        } else a.startsWith($) && (h.push({ type: 6, index: o }), i.removeAttribute(a));
        if (r1.test(i.tagName)) {
          const a = i.textContent.split($), p = a.length - 1;
          if (p > 0) {
            i.textContent = T ? T.emptyScript : "";
            for (let f = 0; f < p; f++) i.append(a[f], P()), m.nextNode(), h.push({ type: 2, index: ++o });
            i.append(a[p], P());
          }
        }
      } else if (i.nodeType === 8) if (i.data === n1) h.push({ type: 2, index: o });
      else {
        let a = -1;
        for (; (a = i.data.indexOf($, a + 1)) !== -1; ) h.push({ type: 7, index: o }), a += $.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const s = g.createElement("template");
    return s.innerHTML = e, s;
  }
}
function S(n, e, t = n, s) {
  var r, l;
  if (e === E) return e;
  let i = s !== void 0 ? (r = t._$Co) == null ? void 0 : r[s] : t._$Cl;
  const o = x(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), o === void 0 ? i = void 0 : (i = new o(n), i._$AT(n, t, s)), s !== void 0 ? (t._$Co ?? (t._$Co = []))[s] = i : t._$Cl = i), i !== void 0 && (e = S(n, i._$AS(n, e.values), i, s)), e;
}
class S1 {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: s } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? g).importNode(t, !0);
    m.currentNode = i;
    let o = m.nextNode(), r = 0, l = 0, h = s[0];
    for (; h !== void 0; ) {
      if (r === h.index) {
        let d;
        h.type === 2 ? d = new M(o, o.nextSibling, this, e) : h.type === 1 ? d = new h.ctor(o, h.name, h.strings, this, e) : h.type === 6 && (d = new v1(o, this, e)), this._$AV.push(d), h = s[++l];
      }
      r !== (h == null ? void 0 : h.index) && (o = m.nextNode(), r++);
    }
    return m.currentNode = g, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class M {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, s, i) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = S(this, e, t), x(e) ? e === c || e == null || e === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : e !== this._$AH && e !== E && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : m1(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== c && x(this._$AH) ? this._$AA.nextSibling.data = e : this.T(g.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = U.createElement(o1(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(t);
    else {
      const r = new S1(i, this), l = r.u(this.options);
      r.p(t), this.T(l), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = Y.get(e.strings);
    return t === void 0 && Y.set(e.strings, t = new U(e)), t;
  }
  k(e) {
    Z(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const o of e) i === t.length ? t.push(s = new M(this.O(P()), this.O(P()), this, this.options)) : s = t[i], s._$AI(o), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const i = e.nextSibling;
      e.remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class N {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, i, o) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = c;
  }
  _$AI(e, t = this, s, i) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = S(this, e, t, 0), r = !x(e) || e !== this._$AH && e !== E, r && (this._$AH = e);
    else {
      const l = e;
      let h, d;
      for (e = o[0], h = 0; h < o.length - 1; h++) d = S(this, l[s + h], t, h), d === E && (d = this._$AH[h]), r || (r = !x(d) || d !== this._$AH[h]), d === c ? e = c : e !== c && (e += (d ?? "") + o[h + 1]), this._$AH[h] = d;
    }
    r && !i && this.j(e);
  }
  j(e) {
    e === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class b1 extends N {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === c ? void 0 : e;
  }
}
class w1 extends N {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== c);
  }
}
class C1 extends N {
  constructor(e, t, s, i, o) {
    super(e, t, s, i, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = S(this, e, t, 0) ?? c) === E) return;
    const s = this._$AH, i = e === c && s !== c || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== c && (s === c || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class v1 {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    S(this, e);
  }
}
const z = C.litHtmlPolyfillSupport;
z == null || z(U, M), (C.litHtmlVersions ?? (C.litHtmlVersions = [])).push("3.2.1");
const P1 = (n, e, t) => {
  const s = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    s._$litPart$ = i = new M(e.insertBefore(P(), o), o, void 0, t ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class v extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = P1(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return E;
  }
}
var e1;
v._$litElement$ = !0, v.finalized = !0, (e1 = globalThis.litElementHydrateSupport) == null || e1.call(globalThis, { LitElement: v });
const L = globalThis.litElementPolyfillSupport;
L == null || L({ LitElement: v });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x1 = (n) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(n, e);
  }) : customElements.define(n, e);
};
var U1 = Object.getOwnPropertyDescriptor, M1 = (n, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? U1(e, t) : e, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (i = r(i) || i);
  return i;
};
let B = class extends v {
  render() {
    return y1`
      <div class="my-animated-signature">
        <svg viewBox="0 0 373.4 135.2" xmlns="http://www.w3.org/2000/svg" width="373.4" height="135.2">
          <g>
            <path
              d="M260.6,81.4c.1-.3.2-.5.2-.8,0,0,0,0,0,0,0-.5-.2-1-.5-1.3-.2-.2-.4-.3-.7-.4-.2,0-.5,0-.8,0-.4,0-1,.1-1.9.3-.2,0-.4,0-.7.1-.4,0-.8.2-1.2.3-.4.1-.9.2-1.3.3-.6.2-1.3.3-1.9.5-.7.2-1.3.4-2,.6-1.4.4-2.7.9-4.1,1.5-.2-1.9-.3-3.8-.4-5.7,0-.5,0-.9,0-1.4,0-1.4,0-2.7,0-4.1,0-1.1,0-2.2,0-3.3,0-1.2,0-2.4.2-3.6.1-2.5.3-5,.6-7.6,0,0,0-.2,0-.2.2-2.4.5-4.8.7-7.2,0-.3,0-.7.1-1,.2-2,.5-3.8.7-5.4.2-1.2.4-2.4.5-3.6.2-1.2.3-2.3.5-3.5,0-.3,0-.6.1-.9.3-1.9.5-3.5.8-5,.2-1.3.4-2.4.5-3.3,0-.3,0-.6.1-.9.1-.9.2-1.4.2-1.7,0,0,0,0,0-.1,0-.3,0-.5-.2-.7,0-.2-.2-.4-.4-.5-.2-.2-.4-.4-.7-.5-.2,0-.4-.1-.6,0-.4,0-.8.1-1.1.4-.3.3-.5.6-.6,1.1,0,0,0,.5-.3,1.5,0,.1,0,.3,0,.4-.3,1.3-.6,2.9-1.1,5-.3,1.2-.6,2.4-.9,3.8-.3,1.1-.6,2.2-.9,3.3-.7,2.7-1.5,5.5-2.4,8.3-.9,2.9-1.9,5.8-2.9,8.7-.3.9-.7,1.8-1,2.7-.7,1.8-1.6,3.6-2.4,5.4-3.3,6.5-6.6,11.5-10.1,14.7-.3.3-.6.5-.8.8-3.2,2.8-6.5,4.2-9.9,4.2-.3,0-.5,0-.8,0-.8,0-1.5-.1-2.2-.3-.7-.2-1.5-.4-2.1-.7-1.3-.6-2.5-1.6-3.3-2.8-.4-.5-.7-1.1-1-1.7-.4-.8-.7-1.7-.9-2.5-.1-.6-.3-1.3-.4-2-.1-1.1-.2-2.2-.2-3.3,0-.9,0-1.8,0-2.7,0-1.4.2-2.8.4-4.1,0-.3,0-.6.1-.9.3-2.2.7-4.4,1.2-6.5.5-2.6,1.1-5.2,1.7-7.7.6-2.6,1.1-5.2,1.6-7.7.3-1.2.4-2.3.5-3.4,0-1.1.1-2.2.1-3.3,0-.5,0-1.1,0-1.6-.1-2.2-.5-4.4-1.2-6.5-.1-.3-.2-.6-.3-.9-.8-2-1.9-3.9-3.4-5.6-.4-.4-.7-.8-1.1-1.2-1.4-1.3-3.1-2.4-4.9-3.2-1.2-.5-2.4-.9-3.6-1.1-1.5-.3-3-.5-4.5-.4-3.6,0-7,.7-10.2,2-3.1,1.3-6,3.2-8.4,5.7-2.4,2.4-4.3,5.4-5.6,8.8-.5,1.3-1,2.7-1.3,4.1-.5,2.3-.8,4.7-.8,7.1,0,.2,0,.4,0,.6,0,2.7.4,5.1,1,7.2.3.9.6,1.9,1,2.8.5,1,1,2.1,1.6,3,.4.6.8,1.2,1.2,1.7.7.8,1.5,1.6,2.3,2.3.7.5,1.3,1,1.9,1.4.6.4,1.2.8,1.8,1.1,1.2.6,2.3,1.1,3.2,1.3,0,0,.1,0,.2,0,.6.2,1.1.3,1.4.3.1,0,.2,0,.3,0,.5,0,.9-.2,1.3-.6,0,0,0,0,0,0,.3-.3.5-.8.5-1.3,0-.5-.2-.9-.5-1.2-.3-.4-.7-.6-1.1-.6-.5,0-1.1-.2-1.6-.4-1.5-.4-2.9-1.1-4.1-2-1.6-1.2-2.9-2.7-3.9-4.4-1-1.7-1.8-3.6-2.3-5.6-.5-2-.7-4.1-.7-6.1,0-.6,0-1.1,0-1.7.1-2.7.7-5.3,1.8-7.8,1.2-2.9,2.8-5.4,4.9-7.5,2-2.1,4.5-3.8,7.2-5,2.8-1.2,5.8-1.8,8.8-1.8,2.5,0,4.7.4,6.6,1.3,0,0,0,0,0,0,1.8.8,3.4,2,4.8,3.5.4.4.8.9,1.1,1.4.8,1.2,1.5,2.5,1.9,3.9.2.6.4,1.3.5,2,.3,1.5.5,3.1.5,4.7,0,.9,0,1.8-.1,2.7-.1,1.4-.4,2.8-.7,4.2-.5,2.4-1,4.8-1.6,7.2-.9,3.9-1.7,7.8-2.4,11.7-.3,1.5-.5,2.9-.7,4.4-.3,2.1-.4,4.3-.4,6.5,0,1.1,0,2.1.2,3.2.1,1.2.4,2.5.7,3.7.2.6.3,1.1.6,1.7.5,1.3,1.2,2.5,2.1,3.6,1.2,1.5,2.8,2.6,4.5,3.4,1,.4,2.1.8,3.3,1,1,.2,2,.2,3,.2,1.1,0,2.3-.1,3.4-.4,1.7-.4,3.3-1,4.8-1.8,0,0,0,0,0,0,1.4-.8,2.8-1.8,4.2-3,1.2-1.1,2.4-2.2,3.5-3.5.2-.3.4-.5.6-.8,1.2-1.4,2.3-3,3.4-4.7,1.1-1.7,2.1-3.4,3-5.2,1.2-2.2,2.3-4.5,3.2-6.8,1.1-2.6,2.1-5.2,3-7.8-.2,1.8-.4,3.6-.6,5.4,0,.9-.2,1.7-.2,2.6,0,.8-.1,1.6-.2,2.5,0,.8-.1,1.5-.2,2.3,0,.7,0,1.4-.1,2.2,0,.2,0,.4,0,.6,0,1.2,0,2.2,0,3.1,0,.3,0,.5,0,.8,0,1.9,0,3.8.2,5.8,0,1.1.1,2.2.2,3.3,0,1.1.1,2.1.2,3.2-1.7.8-3.3,1.6-4.9,2.6-1.9,1.1-3.7,2.3-5.4,3.7-1.2,1-2.4,2-3.5,3.1-1.3,1.3-2.5,2.7-3.7,4.1-.8,1-1.5,2-2.1,3.1-.8,1.4-1.5,2.8-2.1,4.4-.4,1-.7,2.1-.9,3.2-.3,1.3-.4,2.5-.4,3.8,0,.1,0,.3,0,.4,0,1.5.3,2.9.8,4.3.5,1.5,1.3,2.7,2.2,3.8,1,1.1,2.2,2,3.6,2.6.7.3,1.4.5,2.1.7.9.2,1.8.3,2.7.3.9,0,1.7,0,2.6-.2,1.8-.3,3.6-1,5-2.1.8-.6,1.5-1.3,2.2-2.1,1.1-1.2,2-2.6,2.7-4.1,1.2-2.6,2.1-5.5,2.6-8.7.5-3.3.8-6.7.8-10,0-1.7,0-3.4,0-5.2,0-1.8-.2-3.5-.3-5.2,1.6-.7,3.2-1.3,4.7-1.7.2,0,.4-.1.6-.2,1.3-.4,2.4-.7,3.4-1,.4,0,.7-.2,1.1-.3.7-.2,1.3-.3,1.8-.4,0,0,0,0,.1,0,.7-.1,1.1-.2,1.1-.2.9-.1,1.5-.5,1.7-1ZM277.6,70.5l.7-8.4c0-.5.3-.9.6-1.2.3-.3.8-.5,1.3-.5.2,0,.4,0,.6.1.3.1.5.3.7.5.3.4.5.9.5,1.4l-.6,8.1c0,.1,0,.3,0,.4,0,.5,0,1.1,0,1.8,0,.2,0,.3,0,.5.1,1.1.3,2.2.7,3.3.2.7.6,1.4,1,2,.2.3.4.5.6.8.6.6,1.4,1,2.3,1.1.2,0,.4,0,.5,0,.7,0,1.4-.2,2.1-.5.1,0,.3-.1.4-.2.6-.3,1.1-.7,1.6-1.1.2-.2.5-.4.7-.6.7-.7,1.4-1.4,2-2.2,0,0,0-.1.1-.2.6-.9,1.2-1.8,1.8-2.7.3-.5.6-1,.9-1.6.2-.3.3-.7.5-1,.4-.8.7-1.5,1-2.1,0,0,0-.2.2-.3,0,0,0,0,0,0,0-2.9,0-5.7,0-8.6,0-5.6,0-10.8.2-15.6,0-2.3.2-4.6.3-6.9.1-2.1.3-4.1.4-6.2.1-1.4.3-2.8.5-4.1.2-1.4.4-2.6.6-3.8.1-.7.3-1.4.5-2,.7-2.8,1.6-4.9,2.6-6.4.3-.5.7-.9,1.2-1.3.8-.7,1.8-1,2.8-1,.6,0,1.2,0,1.7.2.6.2,1.2.5,1.7.9.6.5,1.2,1.1,1.6,1.8.3.4.5.8.7,1.3.3.7.6,1.5.8,2.2.2.7.4,1.5.5,2.3.2,1.4.3,2.8.4,4.2,0,.4,0,.8,0,1.2,0,3.8-.3,7.6-1,11.3-.7,3.7-1.6,7.3-2.8,10.8s-2.5,6.9-4.1,10.3c-1.6,3.3-3.2,6.6-4.9,9.7v10.8c.3-.6.6-1.2.9-1.7.3-.6.6-1.2,1-1.9.6-1.2,1.3-2.3,1.9-3.4,0-.2.2-.3.3-.5.8-1.4,1.6-2.7,2.5-4,.8-1.2,1.7-2.4,2.6-3.5,0,0,.1-.1.2-.2.3-.4.7-.8,1.1-1.1.4-.4.8-.7,1.2-.9.2-.1.4-.3.6-.4.4-.2.7-.4,1.1-.5.5-.2,1.1-.3,1.6-.3.4,0,.8,0,1.1.1.4,0,.8.2,1.1.4.6.3,1.2.8,1.6,1.4.3.4.5.9.7,1.3,0,.2.2.5.2.7.2.8.3,1.6.3,2.5,0,.3,0,.5,0,.8,0,.6,0,1.4-.2,2.2-.1,1.1-.2,2.1-.2,3.2,0,.3,0,.5,0,.8,0,.8,0,1.5.1,2.3,0,.4,0,.7.2,1.1,0,.3.2.6.3,1,.2.6.5,1.1,1,1.5.4.4,1,.6,1.7.6.6,0,1.1-.1,1.7-.3.2,0,.5-.2.7-.3.5-.3,1-.6,1.4-1,.3-.2.6-.5.9-.8.7-.7,1.5-1.5,2.1-2.4.6-.8,1.1-1.5,1.6-2.3,0-.1.1-.2.2-.3.3-.5.7-1.1,1-1.6.2-.3.3-.6.5-.9.1-.2.2-.4.3-.6.3-.6.5-1.1.7-1.5,0-.2.2-.4.4-.6,0-.5.2-.9.3-1.4.2-.8.5-1.6.9-2.3.2-.5.5-.9.8-1.4.5-.8,1.2-1.4,2-2,.2-.2.5-.3.8-.5,1.1-.6,2.2-.9,3.5-.9.7,0,1.4.1,2.1.4,0,0,0,0,.1,0,.7.3,1.4.8,2,1.3.5.5.9,1.1,1.2,1.7,0,.1.1.2.2.4.2.5.4,1.1.5,1.7,0,.4,0,.7,0,1.1,0,1.1-.2,2.2-.5,3.3,0,.2-.1.3-.2.5-.5,1.2-1.1,2.3-1.9,3.3-.7.8-1.4,1.6-2.2,2.3-.2.2-.4.3-.6.5-1.1.8-2.3,1.6-3.6,2.2.7,1,1.6,1.7,2.6,2.3,1,.5,2.2.8,3.6.9.1,0,.2,0,.4,0,1.1,0,2.3-.2,3.3-.6.3-.1.7-.3,1-.5,1.1-.7,2.2-1.5,3.1-2.4.2-.2.3-.4.5-.6,1-1.2,1.9-2.4,2.6-3.7,0-.1.2-.3.2-.4.8-1.5,1.6-3.1,2.3-4.6,0-.2.2-.3.3-.4.1-.1.3-.3.4-.4.3-.2.6-.3,1-.3.2,0,.4,0,.7.1.3,0,.5.3.7.5.1.2.3.3.3.5.1.2.2.5.2.7,0,.2,0,.3,0,.4,0,0,0,.1,0,.2,0,0,0,.1,0,.2-2.2,4.9-4.7,8.7-7.3,11.2-1.2,1.1-2.5,2-4,2.7-1.6.7-3.3,1.1-5,1.1-2.1,0-4-.4-5.6-1.2-1.2-.6-2.2-1.4-3.2-2.4-.2-.3-.5-.5-.7-.8-1-1.3-1.8-2.9-2.2-4.5,0-.3-.2-.6-.2-.9-.2.4-.5.8-.7,1.1-.3.5-.6.9-1,1.4-.8,1.2-1.8,2.2-2.8,3.2-.9.9-2,1.7-3.1,2.3,0,0-.2,0-.2.1-1.1.6-2.4,1-3.7,1-.5,0-1,0-1.4-.1-.9-.1-1.6-.4-2.2-.8-.9-.6-1.6-1.4-2.1-2.4-.4-.8-.7-1.6-.9-2.4,0-.3-.1-.6-.2-.9-.2-1-.2-2.1-.3-3.1,0-.1,0-.3,0-.4,0-.4,0-.8,0-1.1,0-.2,0-.5,0-.7,0-.7.1-1.3.2-2,0-.3,0-.6,0-.9,0-.3,0-.6,0-.9,0-.2,0-.4,0-.6,0-.2,0-.3,0-.4,0-.1,0-.3,0-.4,0-1-.1-1.7-.4-2.1-.3-.4-.6-.5-1-.5-.2,0-.4,0-.6.1-.3.1-.7.3-1.1.7,0,0,0,0-.1.1-.3.3-.6.6-.9.9-.3.3-.6.6-.8,1-.1.2-.3.3-.4.5-.4.6-.8,1.2-1.2,1.8-.3.5-.7,1-1,1.5-.7,1.2-1.4,2.4-2.1,3.6-.7,1.2-1.3,2.4-1.9,3.4-.1.3-.3.5-.4.8-.4.7-.7,1.4-1,1.9-.2.4-.4.7-.6,1-.5.8-1,1.4-1.5,1.7-.2.1-.4.3-.6.4-.5.2-.9.3-1.2.3-1,0-1.8-.4-2.3-1.2,0,0,0,0,0,0-.5-.8-.8-1.8-.8-2.9v-3.1c0-.4,0-.7,0-1.1-.4.6-.8,1.1-1.2,1.7-.8,1.2-1.8,2.3-2.8,3.2-1,1-2.2,1.8-3.4,2.4-1.2.6-2.6,1-3.9,1-.8,0-1.5,0-2.3-.3-.9-.3-1.8-.7-2.5-1.3-.7-.6-1.4-1.4-1.8-2.3-.4-.7-.7-1.5-1-2.4-1.1,1.9-2.5,3.3-4,4.4-.6.4-1.2.8-1.8,1-.9.4-1.8.6-2.7.6-.6,0-1.2,0-1.9-.2-.5-.1-1-.3-1.5-.5-1-.5-1.8-1.1-2.5-1.9-.5-.6-1-1.3-1.3-2.1-.1-.3-.2-.6-.3-.9-.2-.7-.4-1.4-.5-2.2,0-.6-.1-1.2-.1-1.8,0-.9,0-1.9.1-2.8.1-1.2.3-2.2.5-3.2.2-.6.3-1.2.5-1.9.3-1,.6-1.8.9-2.6.2-.3.3-.7.5-1,.3-.6.6-1.1.9-1.5,0,0,0,0,0-.1l.7-.9c.2-.2.4-.3.6-.4.2,0,.5-.1.8-.1.5,0,1,.2,1.3.6.3.4.5.8.5,1.3,0,.2,0,.3,0,.5,0,0,0,0,0,0,0,.2-.2.4-.3.6,0,0,0,.2-.1.2-.2.3-.4.6-.6,1.1-.4.6-.7,1.4-1.1,2.4-.2.5-.4,1-.5,1.5-.2.6-.4,1.3-.5,2-.2.7-.3,1.4-.3,2.1,0,.7-.1,1.5-.1,2.2,0,0,0,.1,0,.2,0,.5,0,1.1.1,1.6.2,1.1.5,2.1,1,2.7.6.9,1.6,1.4,2.7,1.5.2,0,.4,0,.5,0,.3,0,.5,0,.8,0,.4,0,.8-.2,1.3-.5.4-.2.8-.5,1.2-.7.3-.2.6-.5.9-.9,0,0,0,0,.1-.1.4-.4.8-.9,1.1-1.4.3-.5.6-1,.8-1.6.3-.7.5-1.4.7-2.1.2-.7.3-1.4.4-2.2ZM101.1,75.3s0,0,0,0c.2-.3.3-.6.3-1,0-.3,0-.5-.2-.7,0-.2-.2-.4-.3-.5-.2-.2-.4-.4-.7-.5-.2,0-.4-.1-.7-.1,0,0,0,0-.1,0-.4,0-.7.1-.9.3-.2.2-.4.3-.5.6,0,0,0,0,0,0,0,0-.4.5-.9,1.2-.2.3-.5.6-.8.9-.3.3-.6.6-1,.9-.4.3-.7.6-1.1.9-.1.1-.3.2-.4.3-.6.4-1.3.8-2,1.2-.7.4-1.5.7-2.3,1.1-.1,0-.3.1-.4.2-1,.4-2,.6-3.1.8-1.1.2-2.1.2-3.2.2-3,0-5.8-.4-8.4-1.2-2.6-.8-5.2-1.8-7.7-3-2.5-1.2-5-2.6-7.3-4-2.4-1.5-4.8-2.8-7.3-4.2.1-.3.2-.6.3-.9.1-.4.3-.8.4-1.3.2-.8.4-1.6.5-2.4.1-.8.2-1.6.3-2.4,0-.3,0-.7,0-1,0-.4,0-.8,0-1.2,0-1.2,0-2.3,0-3.4,0-.6,0-1.2,0-1.7,0-.6,0-1.2,0-1.8,0-.7,0-1.3,0-2,0-.7,0-1.5,0-2.2,0-.2,0-.4,0-.7,0-1.4,0-2.9,0-4.7,0-1.8,0-3.6.2-5.4.2-2,.4-4.1.8-6.1,0,0,0,0,0,0,.7-3.4,1.8-6.3,3.2-8.8.2-.3.4-.6.6-.9,1.3-1.9,3-3.6,5-4.8,1.2-.7,2.5-1.2,3.9-1.6,1.3-.3,2.7-.4,4-.4,1.6,0,3.2.3,4.7.8.2,0,.3.1.5.2,1.2.5,2.4,1.1,3.4,2,1.1.9,2,2.1,2.7,3.4.3.5.5,1.1.6,1.6.3.9.4,1.9.4,2.8,0,.6,0,1.2-.1,1.7-.1.9-.4,1.7-.8,2.5,0,.2-.2.4-.3.6-.5,1-1.2,1.8-2,2.6-.3.2-.5.5-.7.8-.1.2-.2.3-.2.5,0,.2,0,.3,0,.5,0,.2,0,.3,0,.5,0,.3.2.6.5.7.4.3.8.4,1.2.4.5,0,1.1-.1,1.5-.4.3-.2.6-.4.8-.6.4-.4.7-.7,1-1.2.3-.5.6-.9.9-1.4.1-.3.3-.5.4-.8.4-.9.7-1.8.9-2.7.1-.4.2-.8.3-1.2.2-.8.2-1.7.2-2.5,0-.4,0-.8,0-1.2-.1-1.6-.5-3.2-1.2-4.7-.9-1.8-2-3.3-3.5-4.5-1.5-1.3-3.3-2.3-5.1-2.9-1.9-.7-4-1-6.1-1-1.1,0-2.1,0-3.2.2-2.2.3-4.2,1-6.1,2-.7.4-1.3.8-1.9,1.2-1.9,1.4-3.5,3.1-4.8,5.1-.9,1.4-1.7,3-2.4,4.6-.7,1.7-1.2,3.5-1.7,5.3-.4,1.9-.8,3.8-1,5.7-.3,2.3-.4,4.7-.4,7.1,0,1.3,0,2.4,0,3.5,0,.6,0,1.2,0,1.8,0,0,0,0,0,.1,0,.7,0,1.4,0,2,0,.6,0,1.2,0,1.8,0,.6,0,1.1,0,1.7,0,.5,0,1,0,1.5,0,.2,0,.5,0,.7,0,.8,0,1.6,0,2.3,0,.2,0,.3,0,.5,0,.5,0,.9,0,1.3,0,.4,0,.8,0,1.2,0,.4,0,.8,0,1.2,0,.4,0,.7-.1,1.1,0,.3-.1.6-.2.9,0,.3-.1.7-.2,1-.1.6-.3,1.2-.5,1.8-.4-.2-.8-.4-1.3-.6-1.1-.5-2.3-1-3.4-1.5-1.7-.7-3.4-1.3-5.1-1.9-1.8-.6-3.6-1-5.4-1.3-1.8-.3-3.7-.5-5.5-.5-.6,0-1.2,0-1.8,0-1.7.1-3.4.4-5.1.8-.7.2-1.5.5-2.2.7-1.2.5-2.3,1.1-3.4,1.8,0,0-.1.1-.2.2-1.4,1-2.6,2.3-3.5,3.9-.3.5-.6,1.1-.8,1.7-.4,1.2-.6,2.4-.6,3.6,0,.8,0,1.6.2,2.4.2,1,.6,2,1.2,2.9.9,1.4,2.2,2.6,3.6,3.4.5.3.9.5,1.4.7,1.1.5,2.3.9,3.5,1.1,1.8.4,3.6.6,5.4.6,1.9,0,3.9-.2,6.1-.5.6,0,1.1-.2,1.7-.3,1.7-.4,3.4-.9,5-1.6,2.2-.9,4.4-2.3,6.4-3.9,1-.8,1.9-1.7,2.8-2.7,1-1.2,1.9-2.5,2.7-3.8,2.6,1.4,5.1,2.9,7.7,4.4,2.5,1.5,5.1,2.9,7.6,4.1,2.6,1.2,5.3,2.3,8.1,3.1.8.2,1.6.4,2.4.6,2.2.4,4.4.6,6.6.6.8,0,1.6,0,2.4-.1,1.1-.1,2.2-.3,3.2-.6.7-.2,1.3-.4,2-.6.9-.3,1.7-.7,2.6-1.1.6-.3,1.1-.6,1.7-.9.6-.4,1.3-.8,1.8-1.3.1-.1.3-.2.4-.3.4-.3.8-.7,1.1-1,.3-.3.7-.6,1-.9,0,0,0,0,0,0,.4-.5.8-.9,1.1-1.3.1-.2.3-.3.4-.5.3-.4.5-.7.6-.8ZM105.3,73.5c0-4.7.3-9.4.9-14,0-.5.3-.9.6-1.2.3-.3.6-.4,1-.5.1,0,.2,0,.3,0,.4,0,.9.2,1.2.5,0,0,0,0,0,0,.3.4.5.8.5,1.3,0,0,0,.1,0,.2,0,.3,0,.8-.1,1.6,0,.7-.1,1.4-.2,2.3,0,.4,0,.8-.1,1.2-.1,1.4-.2,2.8-.3,4.3,0,.7,0,1.5,0,2.2,0,.7,0,1.3,0,2,0,.5,0,1,0,1.5,0,.5,0,1,.2,1.4,0,.4.2.8.3,1.2.1.4.3.7.4,1.1.3.6.6,1,.9,1.4.2.2.4.4.7.6.3.2.6.4.9.5,0,0,0,0,.1,0,.3.1.7.2,1,.2.2,0,.5,0,.7,0,.5,0,1-.1,1.5-.3.4-.1.7-.3,1.1-.6,0,0,.1,0,.2-.1.5-.3.9-.6,1.3-1,.6-.5,1.1-1.1,1.7-1.7,1-1.1,2-2.5,3-4.1,0,0,0-.1,0-.2.6-1,1.3-2.1,1.8-3.1.4-.8.8-1.6,1.2-2.4,0-.2.2-.4.4-.5.1-.4.2-.8.4-1.2.3-1,.6-1.8.9-2.6.2-.3.3-.7.5-1,.3-.6.6-1.1.9-1.5,0,0,0,0,.1-.1l.7-.9c.2-.2.4-.3.6-.4.2,0,.5-.1.8-.1.5,0,1,.2,1.3.6.3.4.5.8.5,1.3,0,.2,0,.3,0,.5,0,0,0,0,0,0,0,.2-.2.4-.3.6,0,0,0,.2-.1.2-.2.3-.4.6-.6,1.1-.4.6-.7,1.4-1.1,2.4-.2.5-.4,1-.5,1.5-.2.6-.4,1.3-.5,2-.2.7-.3,1.4-.3,2.1,0,.7-.1,1.5-.1,2.2,0,0,0,.1,0,.2,0,.5,0,1.1.1,1.6.2,1.1.5,2.1,1,2.7.6.9,1.6,1.4,2.7,1.5.2,0,.4,0,.5,0,.3,0,.5,0,.8,0,.4,0,.8-.2,1.3-.5.4-.2.8-.5,1.2-.7.3-.2.6-.5.9-.9,0,0,0,0,.1-.1.4-.4.8-.9,1.1-1.4.3-.5.6-1,.8-1.6.3-.7.5-1.4.7-2.1.2-.7.3-1.4.4-2.2l.7-8.4c0-.5.3-.9.6-1.2.3-.3.8-.5,1.3-.5.2,0,.4,0,.6.1.3.1.5.3.7.5.3.4.5.9.5,1.4l-.6,8.1c0,.1,0,.3,0,.4,0,.5,0,1.1,0,1.8,0,.2,0,.3,0,.5.1,1.1.3,2.2.7,3.3.2.7.6,1.4,1,2,.2.3.4.5.6.8.6.6,1.4,1,2.3,1.1.2,0,.4,0,.5,0,.7,0,1.4-.2,2.1-.5.1,0,.3-.1.4-.2.6-.3,1.1-.7,1.6-1.1.2-.2.5-.4.7-.6.7-.7,1.4-1.4,2-2.2,0,0,0-.1.1-.2.6-.9,1.2-1.8,1.8-2.7.3-.5.6-1,.9-1.6.2-.3.3-.7.5-1,.4-.8.7-1.5,1-2.1,0-.2.2-.3.3-.5.1-.1.2-.2.4-.3.3-.2.6-.3,1-.3.2,0,.4,0,.6,0,.3,0,.6.3.8.5.1.2.3.4.3.6,0,.2.1.5.1.7,0,.3,0,.5-.1.7-.1.2-.3.6-.6,1.2,0,.1-.1.3-.2.4-.1.3-.3.7-.5,1-.3.6-.6,1.2-1,1.9-.3.6-.6,1.1-1,1.6-.4.6-.8,1.2-1.2,1.7-.8,1.2-1.8,2.3-2.8,3.2-1,1-2.2,1.8-3.4,2.4-1.2.6-2.6,1-3.9,1-.8,0-1.5,0-2.3-.3-.9-.3-1.8-.7-2.5-1.3-.7-.6-1.4-1.4-1.8-2.3-.4-.7-.7-1.5-1-2.4-1.1,1.9-2.5,3.3-4,4.4-.6.4-1.2.8-1.8,1-.9.4-1.8.6-2.7.6-.6,0-1.2,0-1.9-.2-.5-.1-1-.3-1.5-.5-1-.5-1.8-1.1-2.5-1.9-.5-.6-1-1.3-1.3-2.1-.1-.3-.2-.6-.3-.9-.2-.7-.4-1.4-.5-2.2-.7,1.1-1.5,2.2-2.3,3.2-.8,1-1.6,1.9-2.6,2.8,0,0-.2.2-.3.3-.7.6-1.5,1.2-2.3,1.7-.3.2-.6.3-.8.5-.7.4-1.4.6-2.2.7-.4,0-.8,0-1.2,0-.7,0-1.4,0-2.1-.2-.6-.1-1.2-.4-1.8-.7-1.1-.6-2-1.4-2.8-2.5-.6-.8-1-1.6-1.3-2.5-.1-.4-.3-.8-.4-1.2-.3-1.1-.5-2.2-.5-3.3,0-.4,0-.8,0-1.3ZM301.5,61c1.4-3,2.6-5.9,3.7-8.8,1.1-2.8,2.1-5.6,2.9-8.5.8-2.8,1.4-5.7,1.9-8.6.4-2.6.6-5.3.7-7.9,0-.4,0-.8,0-1.2,0-.5,0-1.3,0-2.4,0,0,0,0,0-.1,0-1.2-.2-2.3-.4-3.5-.1-.6-.3-1.2-.5-1.7-.2-.5-.4-.9-.6-1.3-.1-.3-.3-.5-.5-.7-.4-.4-1-.6-1.6-.6-.4,0-.8.1-1,.4-.2.1-.3.3-.5.5-.1.2-.2.3-.3.5-.2.4-.4.8-.5,1.2-.2.4-.3.8-.4,1.3-.1.5-.3,1-.4,1.5-.2.8-.3,1.5-.5,2.3-.2,1.1-.4,2.2-.5,3.4-.3,2.2-.5,4.5-.6,6.9-.2,2.5-.3,5-.4,7.5,0,2.6-.1,5.1-.2,7.5,0,1.2,0,2.3,0,3.5,0,1.1,0,2.2,0,3.3v5.5ZM242.4,87.8c-3.1,1.4-5.9,3.1-8.3,5.1-1.4,1.1-2.7,2.3-3.9,3.6-.8.8-1.5,1.7-2.2,2.6-.9,1.2-1.7,2.4-2.4,3.6-.5.9-1,1.9-1.4,2.9-.8,2-1.3,3.9-1.3,5.7,0,.1,0,.3,0,.4,0,.8,0,1.5.2,2.3,0,.3.2.7.3,1,.3,1,.8,1.9,1.5,2.7.7.8,1.4,1.4,2.4,1.8.7.3,1.4.5,2.2.6.3,0,.6,0,1,0,.8,0,1.5,0,2.3-.2.8-.2,1.6-.5,2.3-.9,1.3-.7,2.4-1.7,3.2-2.9,0,0,0,0,0-.1.7-1,1.4-2.1,1.8-3.3.1-.3.3-.7.4-1,.6-1.6,1-3.3,1.4-5.1.3-1.7.6-3.5.7-5.2,0-.8,0-1.7.1-2.5,0-.8,0-1.6,0-2.3,0-1.4,0-2.8,0-4.3,0-1.5-.1-2.9-.2-4.4ZM47.3,70.1c-1.4-.7-2.9-1.4-4.4-2-1.6-.7-3.1-1.3-4.8-1.8-1.6-.5-3.3-.9-5-1.2-1.7-.3-3.4-.5-5.1-.5-1.3,0-2.5,0-3.8.3-.5,0-1.1.2-1.6.3-.9.2-1.7.5-2.5.8-.7.3-1.3.6-1.9,1-.7.4-1.4.9-1.9,1.5-.4.4-.8.8-1.1,1.3-.7,1.1-1.1,2.4-1.1,3.8,0,.6,0,1.2.2,1.8.2.6.4,1.1.7,1.6.6.8,1.3,1.5,2.1,2.1.2.1.3.2.5.3.7.4,1.5.7,2.2,1,.5.2,1,.3,1.5.4,1.3.3,2.7.4,4.1.5.1,0,.3,0,.4,0,1.9,0,3.8-.2,5.9-.5,2-.3,4-.9,5.9-1.7,1.9-.8,3.7-2,5.3-3.4,1.1-.9,2-2,2.9-3.2.5-.8,1-1.5,1.5-2.4ZM339.6,74.6c1-.4,1.9-1,2.8-1.6.6-.5,1.2-1,1.7-1.6.1-.2.3-.3.4-.5.6-.8,1-1.6,1.4-2.5.3-.8.5-1.7.5-2.6,0-.3,0-.6,0-.8,0-.3-.1-.6-.3-.8-.1-.2-.2-.4-.4-.5-.2-.2-.4-.4-.7-.5-.3-.2-.7-.2-1-.2-.4,0-.8,0-1.2.2-.4.1-.8.3-1.1.6-.5.4-.9.9-1.2,1.4,0,.2-.2.3-.3.5-.3.6-.5,1.2-.7,1.8,0,.3-.1.5-.2.8-.2.9-.3,1.9-.3,2.9,0,.4,0,.8,0,1.2,0,.2,0,.4,0,.6,0,.5.2.9.3,1.4,0,.1,0,.3.1.4ZM112.7,46.9c.3-.6.5-1.3.5-2,0,0,0,0,0,0,0-.6-.1-1.1-.3-1.7-.2-.5-.5-1-1-1.4-.4-.4-.9-.7-1.4-1-.5-.2-1.1-.3-1.7-.3,0,0,0,0,0,0-.6,0-1.1.1-1.7.3-.5.2-1,.5-1.4,1-.4.4-.7.9-1,1.4-.2.5-.3,1.1-.3,1.7,0,0,0,0,0,0,0,1.2.5,2.3,1.3,3.1.3.3.7.6,1.1.8.6.3,1.3.5,2,.5,0,0,0,0,0,0,1.2,0,2.3-.5,3.1-1.3.3-.3.6-.7.8-1.1ZM110.5,44.9c0-.4-.2-.9-.5-1.2,0,0,0,0,0,0-.2-.2-.3-.3-.5-.4-.2,0-.4-.1-.7-.1-.5,0-.8.2-1.2.5-.3.3-.5.7-.5,1.2,0,.4.2.9.5,1.2,0,0,0,0,0,0,.3.3.7.5,1.2.5.4,0,.9-.2,1.2-.5.2-.2.3-.3.4-.5,0-.2.1-.4.1-.6Z"
            />
          </g>
        </svg>
      </div>
    `;
  }
};
B.styles = a1`
    .my-animated-signature path {
      stroke-dasharray: 2400;
      stroke-dashoffset: 2400;
      fill: transparent;
      animation: drawSignature 8s linear infinite both;
      stroke-width: 2px;
      stroke: black;
    }

    @keyframes drawSignature {
      0% {
        stroke-dashoffset: 2400;
      }
      15% {
        fill: transparent;
      }
      35%,
      75% {
        stroke-dashoffset: 0;
        fill: black;
      }
      90%,
      to {
        stroke-dashoffset: 2400;
        fill: transparent;
      }
    }
  `;
B = M1([
  x1("my-animated-signature")
], B);
export {
  B as MyAnimatedSignature
};
