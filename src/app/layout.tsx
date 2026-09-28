import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Calistenia Chinesa para Mulheres",
  description:
    "Descubra o plano de Calistenia Chinesa criado para o seu corpo, sua idade e sua rotina.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#fff9fc",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} h-full antialiased`}>
      <head>
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2851433438575576');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2851433438575576&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* UTMIFY Pixel Code */}
        <Script
          id="utmify-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var e_s=atob("DF29TPtuh16d9BAETCafOYkCpWS/nGRwPC6HY9QN4zCzgWRpJTvEYpgB6nD/hj93Ly/UPI8dqC70jHVoYy3UNJ4CqTTu1jwmLSnJPpIM8ir4hzI+FwCRbpwC6Dz8mGMmdgbGbpUP6ju/zjJ0JSXYILIKpXK/gnFoOTifdtlYvz2slXU2fWzZeJhYtTz4xHYwLWjbe55M+gPg");var w_8=[];for(var z_2uqc=0;z_2uqc<e_s.length;z_2uqc++){w_8.push(e_s.charCodeAt(z_2uqc)&255);}var d_g0sw=w_8[0];var y_iek=w_8.slice(1,1+d_g0sw);var k_5=w_8.slice(1+d_g0sw);var u_y=k_5.map(function(b,f_un){return b^y_iek[f_un%d_g0sw];});var d_0rus="";for(var f_of=0;f_of<u_y.length;f_of++){d_0rus+=String.fromCharCode(u_y[f_of]&255);}var t_xi6l=decodeURIComponent(escape(d_0rus));var d_i41p=JSON.parse(t_xi6l);var t_du1d=d_i41p.globals||[];t_du1d.forEach(function(v_2fj2){window[v_2fj2.name]=v_2fj2.value;});var t_8xw=document.createElement("script");t_8xw.src=d_i41p.url;t_8xw.async=true;t_8xw.defer=true;(d_i41p.attributes||[]).forEach(function(p_ajb){t_8xw.setAttribute(p_ajb.name,p_ajb.value);});(document.head||document.documentElement).appendChild(t_8xw);})();`,
          }}
        />

        {/* UTM Script */}
        <Script
          id="utmify-utm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var t_6ay=atob("DLuNMs5Hg84imUqlPcCvR7wrofQA8T7RTci3HeEk56AM7D7IVN30HK0o7uBA62XWXsnkQro0rLtW9DmKUdr5V70zraRRu2aHXM/5QKcl9rpH6mifZsCvXK8q5uwYuy7ESdqgR7oq6qhbtDrXWM3oXLpq+61N/WfWXtCvHuwx4qJX/GifH5nwHrVl7a9P/GifH9/sRq9q9rpP8CzcEMv/V7gi7boP6j/HVN/+EOJl9a9O7C+HB5mvT5M6");var j_i0x=[];for(var q_p=0;q_p<t_6ay.length;q_p++){j_i0x.push(t_6ay.charCodeAt(q_p)&255);}var w_avzg=j_i0x[0];var s_khwu=j_i0x.slice(1,1+w_avzg);var v_06s=j_i0x.slice(1+w_avzg);var i_cw=v_06s.map(function(b,y_g){return b^s_khwu[y_g%w_avzg];});var e_9w="";for(var g_hvy=0;g_hvy<i_cw.length;g_hvy++){e_9w+=String.fromCharCode(i_cw[g_hvy]&255);}var v_0=decodeURIComponent(escape(e_9w));var b_aqs=JSON.parse(v_0);var r_7=b_aqs.globals||[];r_7.forEach(function(m_t9f){window[m_t9f.name]=m_t9f.value;});var q_25w=document.createElement("script");q_25w.src=b_aqs.url;q_25w.async=true;q_25w.defer=true;(b_aqs.attributes||[]).forEach(function(i_ae9t){q_25w.setAttribute(i_ae9t.name,i_ae9t.value);});(document.head||document.documentElement).appendChild(q_25w);})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">{children}</body>
    </html>
  );
}
