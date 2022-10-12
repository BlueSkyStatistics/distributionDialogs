
var localization = {
    en: {
        title: "F Probabilities",
        navigation: "F Probabilities",
        varvals: "Enter variable value(s) separated by a comma. Example: 3,0.5",
        dfnumerator: "Numerator degrees of freedom",
        dfdenominator: "Denominator degrees of freedom",
        labelSig: "Significance level",
        lowtail: "Lower tail",
        uptail: "Upper tail",
        help: {
            title: "F Probabilities",
            r_help: "help(pf, package=stats)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the F distribution with df1 and df2 degrees of freedom (and optional non-centrality parameter ncp).
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                df(x, df1, df2, ncp, log = FALSE)
                <br/>
                pf(q, df1, df2, ncp, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qf(p, df1, df2, ncp, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rf(n, df1, df2, ncp)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>df1, df2 : degrees of freedom. Inf is allowed.</li>
                
                
                <li>ncp : non-centrality parameter. If omitted the central F is assumed.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            The F distribution with df1 = n1 and df2 = n2 degrees of freedom has density
            <br/>
            <code>f(x) = Γ((n1 + n2)/2) / (Γ(n1/2) Γ(n2/2)) (n1/n2)^(n1/2) x^(n1/2 - 1) (1 + (n1/n2) x)^-(n1 + n2)/2</code>
            <br/>
            for x > 0.
            <br/>
            It is the distribution of the ratio of the mean squares of n1 and n2 independent standard normals, and hence of the ratio of two independent chi-squared variates each divided by its degrees of freedom. Since the ratio of a normal and the root mean-square of m independent normals has a Student's t_m distribution, the square of a t_m variate has a F distribution on 1 and m degrees of freedom.
            <br/>
            The non-central F distribution is again the ratio of mean squares of independent normals of unit variance, but those in the numerator are allowed to have non-zero means and ncp is the sum of squares of the means. See Chisquare for further details on non-central distributions.
            <br/>
            <br/><b>Value</b>
            <br/>
            df gives the density, pf gives the distribution function qf gives the quantile function, and rf generates random deviates.
            <br/>
            Invalid arguments will result in return value NaN, with a warning.
            <br/>
            The length of the result is determined by n for rf, and is the maximum of the lengths of the numerical arguments for the other functions.
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




class fProbabilities extends baseModal {
    constructor() {
        var config = {
            id: "fProbabilities",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                result = stats::pf(c({{selected.varvals | safe}}), df1={{selected.dfnumerator | safe}}, df2={{selected.dfdenominator | safe}}, lower.tail={{selected.a | safe}} )
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
            dfnumerator: {
                el: new input(config, {
                    no: 'dfnumerator',
                    label: localization.en.dfnumerator,
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            dfdenominator: {
                el: new input(config, {
                    no: 'dfdenominator',
                    label: localization.en.dfdenominator,
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            labelSig: { el: new labelVar(config, { label: localization.en.labelSig, style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: localization.en.lowtail, no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: localization.en.uptail, no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.dfnumerator.el.content, objects.dfdenominator.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-f-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new fProbabilities().render()