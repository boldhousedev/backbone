import _ from "underscore-bd";
import Backbone from "backbone";

var listener = {
    model_prototype: {},
    collection_prototype: {},
    view_prototype: {},
};

listener.view_prototype.listenToOnce = listener.model_prototype.listenToOnce = listener.collection_prototype.listenToOnce = function (
    l1,
    l2,
    l3
) {
    if (_.isArray(l1) && _.isArray(l2)) {
        var d = new Date().format("dd-MM-yyyy HH:mm:ss");

        l1[3] = _.bind(
            _.partial(
                function (l1, l2) {
                    this.stopListening(l2[0], l2[1], l2[3]);

                    var args = _.toArray(arguments);
                    args.shift();
                    args.shift();

                    l1[2].apply(this, args);
                },
                l1,
                l2
            ),
            this
        );

        l2[3] = _.bind(
            _.partial(
                function (l1, l2) {
                    this.stopListening(l1[0], l1[1], l1[3]);

                    var args = _.toArray(arguments);
                    args.shift();
                    args.shift();

                    l2[2].apply(this, args);
                },
                l1,
                l2
            ),
            this
        );

        this.listenToOnce(l1[0], l1[1], l1[3]);
        this.listenToOnce(l2[0], l2[1], l2[3]);
        return;
    }

    return _.bind(Backbone.Model.prototype.listenToOnce, this)(l1, l2, l3);
};

listener.view_prototype.once = listener.model_prototype.once = listener.collection_prototype.once = function (
    c1,
    c2
) {
    if (_.isArray(c1) && _.isArray(c2)) {
        c1[2] = _.bind(
            _.partial(
                function (c1, c2) {
                    this.off(c2[0], c2[2]);

                    var args = _.toArray(arguments);
                    args.shift();
                    args.shift();

                    c1[1].apply(null, args);
                },
                c1,
                c2
            ),
            this
        );

        c2[2] = _.bind(
            _.partial(
                function (c1, c2) {
                    this.off(c1[0], c1[2]);

                    var args = _.toArray(arguments);
                    args.shift();
                    args.shift();

                    c2[1].apply(null, args);
                },
                c1,
                c2
            ),
            this
        );

        this.once(c1[0], c1[2]);
        this.once(c2[0], c2[2]);
        return;
    }

    return _.bind(Backbone.Model.prototype.once, this)(c1, c2);
};

export default listener;
