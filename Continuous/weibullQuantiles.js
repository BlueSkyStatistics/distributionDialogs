
var localization = {
    en: {
        title: "Weibull Quantiles",
        navigation: "Weibull Quantiles",
        prob: "Enter probabilities separated by a comma. Example: 0.3,0.2,0.5",
        shape: "Shape",
        scale: "Scale",
        labelSig: "Significance level",
        lowtail: "Lower tail",
        uptail: "Upper tail",
        help: {
            title: "Weibull Quantiles",
            r_help: "help(qweibull, package=stats)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the Weibull distribution with parameters shape and scale.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dweibull(x, shape, scale = 1, log = FALSE)
                <br/>
                pweibull(q, shape, scale = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qweibull(p, shape, scale = 1, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rweibull(n, shape, scale = 1)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>shape, scale : shape and scale parameters, the latter defaulting to 1.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            The Weibull distribution with shape parameter a and scale parameter b has density given by
            <br/>
            <code>f(x) = (a/b) (x/b)^(a-1) exp(- (x/b)^a)</code>
            <br/>
            for x > 0. The cumulative distribution function is F(x) = 1 - exp(- (x/b)^a) on x > 0, the mean is E(X) = b Γ(1 + 1/a), and the Var(X) = b^2 * (Γ(1 + 2/a) - (Γ(1 + 1/a))^2).
            <br/>
            <br/><b>Value</b>
            <br/>
            dweibull gives the density, pweibull gives the distribution function, qweibull gives the quantile function, and rweibull generates random deviates.
            <br/>
            Invalid arguments will result in return value NaN, with a warning.
            <br/>
            The length of the result is determined by n for rweibull, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
            <br/>
            <br/><b>Note</b>
            <br/>
            The cumulative hazard <code>H(t) = - log(1 - F(t))</code> is
            <br/>
            -pweibull(t, a, b, lower = FALSE, log = TRUE)
            
            which is just <code>H(t) = (t/b)^a</code>.            
`}  
    }
}




class weibullQuantiles extends baseModal {
    constructor() {
        var config = {
            id: "weibullQuantiles",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::qweibull(c({{selected.prob | safe}}), shape={{selected.shape | safe}}, scale={{selected.scale | safe}}, lower.tail={{selected.a | safe}} )
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
            shape: {
                el: new input(config, {
                    no: 'shape',
                    label: localization.en.shape,
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            scale: {
                el: new input(config, {
                    no: 'scale',
                    label: localization.en.scale,
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
            items: [objects.prob.el.content, objects.shape.el.content, objects.scale.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-weibull_distribution-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new weibullQuantiles().render()