
var localization = {
    en: {
        title: "Geometric Quantiles",
        navigation: "Geometric Quantiles",
        varvals: "Enter probabilities separated by a comma. Example: 0.3,0.2,0.5",
        prob: "Mean",
        labelSig: "Significance level",
        lowtail: "Lower tail",
        uptail: "Upper tail",
        help: {
            title: "Geometric Quantiles",
            r_help: "help(qgeom, package=stats)",
            body: `

            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the geometric distribution with parameter prob.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dgeom(x, prob, log = FALSE)
                <br/>
                pgeom(q, prob, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qgeom(p, prob, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rgeom(n, prob)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles representing the number of failures in a sequence of Bernoulli trials before success occurs.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>prob : probability of success in each trial. 0 < prob <= 1.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            The geometric distribution with prob = p has density
            <br/>
            <code>
                p(x) = p (1-p)^x
                for x = 0, 1, 2, …, 0 < p ≤ 1.
            </code>
            <br/>
            If an element of x is not integer, the result of dgeom is zero, with a warning.
            <br/>
            The quantile is defined as the smallest value x such that F(x) ≥ p, where F is the distribution function.
            <br/>
            <br/><b>Value</b>
            <br/>
            dgeom gives the density, pgeom gives the distribution function, qgeom gives the quantile function, and rgeom generates random deviates.
            <br/>
            Invalid prob will result in return value NaN, with a warning.
            <br/>
            The length of the result is determined by n for rgeom, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.            
`}
    }
}




class geometricQuantiles extends baseModal {
    constructor() {
        var config = {
            id: "geometricQuantiles",
            label: localization.en.title,
            modalType: "one",
            RCode: `
                    local(
                        {
                        result = stats::qgeom(c({{selected.varvals | safe}}), prob={{selected.prob | safe}}, lower.tail={{selected.a | safe}} )
                        print(result)
                        }
                        )                    
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: localization.en.varvals,
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: localization.en.prob,
                    required: true,
                    placeholder: "0.5",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0.5"
                })
            },
            labelSig: { el: new labelVar(config, { label: localization.en.labelSig, style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: localization.en.lowtail, no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: localization.en.uptail, no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.prob.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-area-chart-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new geometricQuantiles().render()