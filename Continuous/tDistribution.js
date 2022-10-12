
var localization = {
    en: {
        title: "t Distribution Plot",
        navigation: "t Distribution Plot",

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
            title: "t Distribution Plot",
            r_help: "help(qt, package=stats)",
            body: `
            ​​
            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the t distribution with df degrees of freedom (and optional non-centrality parameter ncp).
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dt(x, df, ncp, log = FALSE)
                <br/>
                pt(q, df, ncp, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qt(p, df, ncp, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rt(n, df, ncp)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles.</li>
                
                
                <li>p : vector of probabilities.</li>
                
                
                <li>n : number of observations. If length(n) > 1, the length is taken to be the number required.</li>
                
                
                <li>df : degrees of freedom (> 0, maybe non-integer). df = Inf is allowed.</li>
                
                
                <li>ncp : non-centrality parameter delta; currently except for rt(), only for abs(ncp) <= 37.62. If omitted, use the central t distribution.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            The t distribution with df = n degrees of freedom has density
            <br/>
            <code>f(x) = Γ((n+1)/2) / (√(n π) Γ(n/2)) (1 + x^2/n)^-((n+1)/2)</code>
            <br/>
            for all real x. It has mean 0 (for n > 1) and variance n/(n-2) (for n > 2).
            <br/>
            The general non-central t with parameters (df, Del) = (df, ncp) is defined as the distribution of T(df, Del) := (U + Del) / √(V/df) where U and V are independent random variables, U ~ N(0,1) and V ~ χ^2(df) (see Chisquare).
            <br/>
            The most used applications are power calculations for t-tests:
             Let T= (mX - m0) / (S/sqrt(n)) where mX is the mean and S the sample standard deviation (sd) of X_1, X_2, …, X_n which are i.i.d. N(μ, σ^2) Then T is distributed as non-central t with df= n - 1 degrees of freedom and non-centrality parameter ncp = (μ - m0) * sqrt(n)/σ.
             <br/>
            <br/><b>Value</b>
            <br/>
            dt gives the density, pt gives the distribution function, qt gives the quantile function, and rt generates random deviates.
            <br/>
            Invalid arguments will result in return value NaN, with a warning.
            <br/>
            The length of the result is determined by n for rt, and is the maximum of the lengths of the numerical arguments for the other functions.
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




class tDistributionPlot extends baseModal {
    constructor() {
        var config = {
            id: "tDistributionPlot",
            label: localization.en.title,
            modalType: "one",
            RCode: `
            local(
                {
                #Generating the sequence of length 1000,the lower and upper bounds of the sequence are computed using the quantile function of the t distribution  (qt)  with p=0.0005 and p=0.9995 respectively 
                lowProbBound =0.0005
                upperProbBound=0.9995
                lowerbound =stats::qt(p=lowProbBound,df={{selected.degoffree | safe}})
                upperbound =stats::qt(p=upperProbBound,df={{selected.degoffree | safe}})
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
                  RcmdrMisc::plotDistr(.x,stats::dt(.x,df={{selected.degoffree | safe}}),cdf=FALSE,xlab="x",ylab="Density",main=paste("t Distribution:  Degrees of freedom={{selected.degoffree | safe}}"),regions=regionslist,col=c('{{selected.reg1col | safe}}','{{selected.reg2col | safe}}'),legend.pos='{{selected.c | safe}}'  )
                }
                else
                {
                  RcmdrMisc::plotDistr(.x,stats::pt(.x,df={{selected.degoffree | safe}}),cdf=TRUE,xlab="x",ylab="Cumulative Probability",main=paste("t Distribution:  Degrees of freedom={{selected.degoffree | safe}}"),regions=regionslist,col=c('{{selected.reg1col | safe}}','{{selected.reg2col | safe}}'),legend.pos='{{selected.c | safe}}'  )
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
                icon: "icon-tumblr-g",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new tDistributionPlot().render()