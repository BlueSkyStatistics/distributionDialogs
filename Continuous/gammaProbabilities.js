
var localization = {
    en: {
        title: "Gamma Probabilities",
        navigation: "Gamma Probabilities",
        varvals: "Enter variable value(s) separated by a comma. Example: 3,0.5",
        shape: "Shape",
        scale: "Scale (inverse rate)",
        labelSig: "Significance level",
        lowtail: "Lower tail",
        uptail: "Upper tail",
        help: {
            title: "Gamma Probabilities",
            r_help: "help(pgamma, package=stats)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the Gamma distribution with parameters shape and scale.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dgamma(x, shape, rate = 1, scale = 1/rate, log = FALSE)
                <br/>
                pgamma(q, shape, rate = 1, scale = 1/rate, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qgamma(p, shape, rate = 1, scale = 1/rate, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rgamma(n, shape, rate = 1, scale = 1/rate)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li></li>
                <li>x, q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>rate : an alternative way to specify the scale.</li>
                
                
                <li>shape, scale : shape and scale parameters. Must be positive, scale strictly.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities/densities p are returned as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            Details
            <br/>
            If scale is omitted, it assumes the default value of 1.
            <br/>
            The Gamma distribution with parameters shape = a and scale = s has density
            <br/>
            <code>f(x)= 1/(s^a Gamma(a)) x^(a-1) e^-(x/s)</code>
            <br/>
            for x ≥ 0, a > 0 and s > 0. (Here Gamma(a) is the function implemented by R's gamma() and defined in its help. Note that a = 0 corresponds to the trivial distribution with all mass at point 0.)
            <br/>
            The mean and variance are <code>E(X) = a*s and Var(X) = a*s^2.</code>
            <br/>
            The cumulative hazard <code>H(t) = - log(1 - F(t))</code> is
            <br/>
            -pgamma(t, ..., lower = FALSE, log = TRUE)
            <br/>
            Note that for smallish values of shape (and moderate scale) a large parts of the mass of the Gamma distribution is on values of x so near zero that they will be represented as zero in computer arithmetic. So rgamma may well return values which will be represented as zero. (This will also happen for very large values of scale since the actual generation is done for scale = 1.)
            <br/>
            <br/><b>Value</b>
            <br/>
            dgamma gives the density, pgamma gives the distribution function, qgamma gives the quantile function, and rgamma generates random deviates.
            <br/>
            Invalid arguments will result in return value NaN, with a warning.
            <br/>
            The length of the result is determined by n for rgamma, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
            <br/>
            <br/><b>Note</b>
            <br/>
            The S (Becker et al, 1988) parametrization was via shape and rate: S had no scale parameter. It is an error to supply and scale and rate.
            <br/>
            pgamma is closely related to the incomplete gamma function. As defined by Abramowitz and Stegun 6.5.1 (and by ‘Numerical Recipes’) this is
            <br/>
            <code>P(a,x) = 1/Gamma(a) integral_0^x t^(a-1) exp(-t) dt</code>
            <br/>
            P(a, x) is pgamma(x, a). Other authors (for example Karl Pearson in his 1922 tables) omit the normalizing factor, defining the incomplete gamma function γ(a,x) as gamma(a,x) = integral_0^x t^(a-1) exp(-t) dt, i.e., pgamma(x, a) * gamma(a). Yet other use the ‘upper’ incomplete gamma function,
            <br/>
            <code>Gamma(a,x) = integral_x^Inf t^(a-1) exp(-t) dt,</code>
            <br/>
            which can be computed by pgamma(x, a, lower = FALSE) * gamma(a).
            <br/>
            Note however that pgamma(x, a, ..) currently requires a > 0, whereas the incomplete gamma function is also defined for negative a. In that case, you can use gamma_inc(a,x) (for Γ(a,x)) from package gsl.
            <br/>
            See also https://en.wikipedia.org/wiki/Incomplete_gamma_function, or http://dlmf.nist.gov/8.2#i.            
`}        
    }
}




class gammaProbabilities extends baseModal {
    constructor() {
        var config = {
            id: "gammaProbabilities",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::pgamma(c({{selected.varvals | safe}}), shape={{selected.shape | safe}}, scale={{selected.scale | safe}}, lower.tail={{selected.a | safe}} )
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
            items: [objects.varvals.el.content, objects.shape.el.content, objects.scale.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-gamma-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new gammaProbabilities().render()