
var localization = {
    en: {
        title: "Chi-squared Distribution Plot",
        navigation: "Chi-squared Distribution Plot",

        degoffree: "Degrees of freedom",

        pdenfun: "Plot density function",
        pdstfun: "Plot distribution function",
        lblregions: "Optionally specify regions under the density function by",
        xvals : "x-values",
        quantiles : "quantiles",
        lblRegFill : "Regions to fill (specify one or two, or leave blank)",
        lblreg1 : "Region 1 :",
        lblreg2 : "Region 2 :",
        lblregfrm : "From",
        lblregto : "To",
        lblregcol : "Color",
        lblLegPos: "Position of legend",
        toprt: "Top right",
        toplt: "Top left",
        topmid: "Top center",
        help: {
            title: "Chi-squared Distribution Plot",
            r_help: "help(qchisq, package=stats)",
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




class chisquaredDistributionPlot extends baseModal {
    constructor() {
        var config = {
            id: "chisquaredDistributionPlot",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                #Generating the sequence of length 1000,the lower and upper bounds of the sequence are computed using the quantile function of the Chi-sq distribution  (qchisq)  with p=0.0005 and p=0.9995 respectively 
                lowProbBound =0.0005
                upperProbBound=0.9995
                lowerbound =stats::qchisq(p=lowProbBound,df={{selected.degoffree | safe}})
                upperbound =stats::qchisq(p=upperProbBound,df={{selected.degoffree | safe}})
                .x <- seq(lowerbound,upperbound,length.out=1000)  

                regionslist=NULL
                if(!is.na(as.numeric('{{selected.reg1frm | safe}}')) && !is.na(as.numeric('{{selected.reg1to | safe}}')) && !is.na(as.numeric('{{selected.reg2frm | safe}}')) && !is.na(as.numeric('{{selected.reg2to | safe}}')) )
                {
                    regionslist = list(c({{selected.reg1frm | safe}}, {{selected.reg1to | safe}}),c({{selected.reg2frm | safe}}, {{selected.reg2to | safe}}) )
                }
                else if(!is.na(as.numeric('{{selected.reg1frm | safe}}')) && !is.na(as.numeric('{{selected.reg1to | safe}}')))
                {
                        regionslist = list(c({{selected.reg1frm | safe}},{{selected.reg1to | safe}}))
                }
                
                #Plot a density function
                if({{selected.a | safe}})
                {
                  RcmdrMisc::plotDistr(.x,stats::dchisq(.x,df={{selected.degoffree | safe}}),cdf=FALSE,xlab="x",ylab="Density",main=paste("Chi-squared Distribution:  Degrees of freedom={{selected.degoffree | safe}}"),regions=regionslist,col=c('{{selected.reg1col | safe}}','{{selected.reg2col | safe}}'),legend.pos='{{selected.c | safe}}'  )
                }
                else
                {
                  RcmdrMisc::plotDistr(.x,stats::pchisq(.x,df={{selected.degoffree | safe}}),cdf=TRUE,xlab="x",ylab="Cumulative Probability",main=paste("Chi-squared Distribution:  Degrees of freedom={{selected.degoffree | safe}}"),regions=regionslist,col=c('{{selected.reg1col | safe}}','{{selected.reg2col | safe}}'),legend.pos='{{selected.c | safe}}'  )
                }

                }
                )
                `
        }
        var objects = {
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

            plotdenfun: { el: new radioButton(config, { label: localization.en.pdenfun, no: "a", increment: "TRUE", style:"mt-3", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            plotdistfun: { el: new radioButton(config, { label: localization.en.pdstfun, no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) },

            lblRegUndr: { el: new labelVar(config, { label: localization.en.lblregions, style: "mt-3",h: 5 }) },
            xvalrad: { el: new radioButton(config, { label: localization.en.xvals, no: "b", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            quntlrad: { el: new radioButton(config, { label: localization.en.quantiles, no: "b", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) },

            lblRegiFill: { el: new labelVar(config, { label: localization.en.lblRegFill, style: "mt-3",h: 5}) },

            lblRegion1: { el: new labelVar(config, { label: localization.en.lblreg1, style: "mt-3",h: 6 }) },
            reg1Frm: {
                el: new input(config, {
                    no: 'reg1frm',
                    label: localization.en.lblregfrm,
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            reg1To: {
                el: new input(config, {
                    no: 'reg1to',
                    label: localization.en.lblregto,
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            reg1Col: {
                el: new colorInput(config, {
                    no: 'reg1col',
                    label: localization.en.lblregcol,
                    placeholder: "#BEBEBE",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#BEBEBE"
                })
            },            

            lblRegion2: { el: new labelVar(config, { label: localization.en.lblreg2, style: "mt-3",h: 6 }) },
            reg2Frm: {
                el: new input(config, {
                    no: 'reg2frm',
                    label: localization.en.lblregfrm,
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },    
            reg2To: {
                el: new input(config, {
                    no: 'reg2to',
                    label: localization.en.lblregto,
                    placeholder: "",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: ""
                })
            },     
            reg2Col: {
                el: new colorInput(config, {
                    no: 'reg2col',
                    label: localization.en.lblregcol,
                    placeholder: "#BEBEBE",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#BEBEBE"
                })
            },                           

            lblLegposi: { el: new labelVar(config, { label: localization.en.lblLegPos, style: "mt-3",h: 5 }) },
            toprtrad: { el: new radioButton(config, { label: localization.en.toprt, no: "c", increment: "TRUE", value: "topright", state: "checked", extraction: "ValueAsIs" }) },
            topltrad: { el: new radioButton(config, { label: localization.en.toplt, no: "c", increment: "FALSE", value: "topleft", state: "", extraction: "ValueAsIs" }) },
            topmidrad: { el: new radioButton(config, { label: localization.en.topmid, no: "c", increment: "FALSE", value: "top", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.degoffree.el.content,
                objects.plotdenfun.el.content, objects.plotdistfun.el.content, objects.lblRegUndr.el.content,
                objects.xvalrad.el.content, objects.quntlrad.el.content, 
                objects.lblRegiFill.el.content, 
                objects.lblRegion1.el.content, objects.reg1Frm.el.content, objects.reg1To.el.content, objects.reg1Col.el.content, 
                objects.lblRegion2.el.content, objects.reg2Frm.el.content, objects.reg2To.el.content, objects.reg2Col.el.content,
                objects.lblLegposi.el.content, objects.toprtrad.el.content, objects.topltrad.el.content,objects.topmidrad.el.content
            ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-chi_squared-g",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new chisquaredDistributionPlot().render()