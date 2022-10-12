
var localization = {
    en: {
        title: "Chi-squared Probabilities",
        navigation: "Chi-squared Probabilities",
        varvals: "Enter variable value(s) separated by a comma. Example: 3,0.5",
        degoffree: "Degrees of freedom",
        labelSig: "Significance level",
        lowtail: "Lower tail",
        uptail: "Upper tail",
        help: {
            title: "Chi-squared Probabilities",
            r_help: "help(pchisq, package=stats)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the chi-squared (chi^2) distribution with df degrees of freedom and optional non-centrality parameter ncp.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dchisq(x, df, ncp = 0, log = FALSE)
                <br/>
                pchisq(q, df, ncp = 0, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qchisq(p, df, ncp = 0, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rchisq(n, df, ncp = 0)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>df : degrees of freedom (non-negative, but can be non-integer).</li>
                
                
                <li>ncp : non-centrality parameter (non-negative).</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            The chi-squared distribution with df= n ≥ 0 degrees of freedom has density
            <br/>
            <code>f_n(x) = 1 / (2^(n/2) Γ(n/2)) x^(n/2-1) e^(-x/2)</code>
            <br/>
            for x > 0. The mean and variance are n and 2n.
            <br/>
            The non-central chi-squared distribution with df= n degrees of freedom and non-centrality parameter ncp = λ has density
            <br/>
            <code>f(x) = exp(-λ/2) SUM_{r=0}^∞ ((λ/2)^r / r!) dchisq(x, df + 2r)</code>
            <br/>
            for x ≥ 0. For integer n, this is the distribution of the sum of squares of n normals each with variance one, λ being the sum of squares of the normal means; further, 
            <br/>
             <code>E(X) = n + λ, Var(X) = 2(n + 2*λ), and E((X - E(X))^3) = 8(n + 3*λ).</code>
             <br/>
            Note that the degrees of freedom df= n, can be non-integer, and also n = 0 which is relevant for non-centrality λ > 0, see Johnson et al (1995, chapter 29). In that (noncentral, zero df) case, the distribution is a mixture of a point mass at x = 0 (of size pchisq(0, df=0, ncp=ncp)) and a continuous part, and dchisq() is not a density with respect to that mixture measure but rather the limit of the density for df -> 0.
            <br/>
            Note that ncp values larger than about 1e5 may give inaccurate results with many warnings for pchisq and qchisq.
            <br/>
            <br/><b>Value</b>
            <br/>
            dchisq gives the density, pchisq gives the distribution function, qchisq gives the quantile function, and rchisq generates random deviates.
            <br/>
            Invalid arguments will result in return value NaN, with a warning.
            <br/>
            The length of the result is determined by n for rchisq, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.
            <br/>
            <br/><b>Note</b>
            <br/>
            Supplying ncp = 0 uses the algorithm for the non-central distribution, which is not the same algorithm used if ncp is omitted. This is to give consistent behaviour in extreme cases with values of ncp very near zero.
            <br/>
            The code for non-zero ncp is principally intended to be used for moderate values of ncp: it will not be highly accurate, especially in the tails, for large values.            
`}        
    }
}




class chisquaredProbabilities extends baseModal {
    constructor() {
        var config = {
            id: "chisquaredProbabilities",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::pchisq(c({{selected.varvals | safe}}), df={{selected.degoffree | safe}}, lower.tail={{selected.a | safe}} )
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
            degoffree: {
                el: new input(config, {
                    no: 'degoffree',
                    label: localization.en.degoffree,
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            labelSig: { el: new labelVar(config, { label: localization.en.labelSig, style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: localization.en.lowtail, no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: localization.en.uptail, no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.degoffree.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-chi_squared-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new chisquaredProbabilities().render()