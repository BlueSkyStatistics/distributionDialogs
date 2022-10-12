
var localization = {
    en: {
        title: "Exponential Quantiles",
        navigation: "Exponential Quantiles",
        prob: "Enter probabilities separated by a comma. Example: 0.3,0.2,0.5",
        rate: "Rate",
        labelSig: "Significance level",
        lowtail: "Lower tail",
        uptail: "Upper tail",
        help: {
            title: "Exponential Quantiles",
            r_help: "help(qexp, package=stats)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the exponential distribution with rate rate (i.e., mean 1/rate).
            <br/>
            Usage
            <br/>
            <code>
                dexp(x, rate = 1, log = FALSE)
                <br/>
                pexp(q, rate = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qexp(p, rate = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rexp(n, rate = 1)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>rate : vector of rates.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            If rate is not specified, it assumes the default value of 1.
            <br/>
            The exponential distribution with rate λ has density
            <br/>
            <code>f(x) = λ {e}^{- λ x}</code>
            <br/>
            for x ≥ 0.
            <br/>
            <br/><b>Value</b>
            <br/>
            dexp gives the density, pexp gives the distribution function, qexp gives the quantile function, and rexp generates random deviates.
            <br/>
            The length of the result is determined by n for rexp, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
            <br/>
            <br/><b>Note</b>
            <br/>
            The cumulative hazard H(t) = - log(1 - F(t)) is -pexp(t, r, lower = FALSE, log = TRUE).            
`}        
    }
}




class exponentialQuantiles extends baseModal {
    constructor() {
        var config = {
            id: "exponentialQuantiles",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::qexp(c({{selected.prob | safe}}), rate={{selected.rate | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: localization.en.prob,
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            rate: {
                el: new input(config, {
                    no: 'rate',
                    label: localization.en.rate,
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: localization.en.labelSig, style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: localization.en.lowtail, no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: localization.en.uptail, no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.prob.el.content, objects.rate.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-letter-e-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new exponentialQuantiles().render()