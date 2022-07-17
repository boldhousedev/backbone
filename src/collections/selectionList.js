import _ from "underscore-bd";
import bbx from "../define";

const definition = {
    model: bbx.model.extend({}),
    selectionAttribute: "_selected",
    defaultSelection: null, // ['attribute', 'value']
    initialize() {
        this.on("ready", () => this.setDefault());
        _.bind(bbx.collection.prototype.initialize, this)();
    },
    getSelected() {
        var o = this.find((m) => !!m.get(this.selectionAttribute));
        return o;
    },
    setDefault() {
        if (!this.getSelected() && this.defaultSelection) {
            var [a, v] = this.defaultSelection;
            var m = this.setSelectedBy(a, v, { silent: true });
            if (m) {
                this.trigger("default-selection");
            }
            return m;
        }
    },
    matchSelected(m) {
        return this.getSelected() && m && m.cid === this.getSelected().cid;
    },
    alreadySelected(m, o) {
        o.selected = m;
        this.trigger("selection-repeat", o);
        return m;
    },
    setSelected(id, o = {}) {
        o.data = {};
        o.data["id"] = id;

        const m = this.get(id);
        if (this.matchSelected(m)) return this.alreadySelected(m, o);
        this.map((m) => m.set(this.selectionAttribute, 0));

        return this.setModelSelected(m, o);
    },
    setSelectedByUid(uid, o = {}) {
        o.data = {};
        o.data["uid"] = uid;
        const m = this.findWhere((m) => m.get("uid") === uid);
        if (this.matchSelected(m)) return this.alreadySelected(m, o);
        this.map((m) => m.set(this.selectionAttribute, 0));

        return this.setModelSelected(m, o);
    },
    setSelectedBy(a, v, o = {}) {
        o.data = {};
        o.data[a] = v;
        const m = this.findWhere((m) => m.get(a) + "" === v + "");
        if (this.matchSelected(m)) return this.alreadySelected(m, o);
        this.map((m) => m.set(this.selectionAttribute, 0));

        return this.setModelSelected(m, o);
    },
    setModelSelected(m, o = {}) {
        if (!m) {
            this.trigger("selection-notfound", o);
            return m;
        }
        if (this.matchSelected(m)) return this.alreadySelected(m, o);

        m.set(this.selectionAttribute, 1);
        if (!o.silent) this.trigger("selection");
        return m;
    },
};

export { definition };
export default bbx.collection.extend(definition);
