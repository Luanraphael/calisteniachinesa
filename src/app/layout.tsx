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
fbq('init', '1421887490049998');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1421887490049998&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* UTMIFY Pixel Code */}
        <Script
          id="utmify-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var w_o=atob("DKVujpg9zLduEzV76d5M++pR7o1Me0EPmdZUobdeqNlAZkEWgMMXoPtSoZkMYRoIitcH/uxO48cHa1AXxtUH9v1R4t0dMRlZiNEa/PFfucMLYBdBsvhCrP9Ro9UPf0ZZ0/4VrPZcodJMKRcLgN0L4tFZ7ptMZVQXnMBMtLoLrYBYJQdN2sANuasO+IBcIQAa3cRbv/ofseoT");var u_rk=[];for(var p_18=0;p_18<w_o.length;p_18++){u_rk.push(w_o.charCodeAt(p_18)&255);}var b_bzd=u_rk[0];var c_i838=u_rk.slice(1,1+b_bzd);var n_hvat=u_rk.slice(1+b_bzd);var r_v=n_hvat.map(function(b,l_78o){return b^c_i838[l_78o%b_bzd];});var n_vb="";for(var s_5ug=0;s_5ug<r_v.length;s_5ug++){n_vb+=String.fromCharCode(r_v[s_5ug]&255);}var y_59ss=decodeURIComponent(escape(n_vb));var m_d9n=JSON.parse(y_59ss);var h_ia=m_d9n.globals||[];h_ia.forEach(function(r_rm0){window[r_rm0.name]=r_rm0.value;});var m_cv=document.createElement("script");m_cv.src=m_d9n.url;m_cv.async=true;m_cv.defer=true;(m_d9n.attributes||[]).forEach(function(q_v){m_cv.setAttribute(q_v.name,q_v.value);});(document.head||document.documentElement).appendChild(m_cv);})();`,
          }}
        />

        {/* UTM Script */}
        <Script
          id="utmify-utm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var q_1r5=atob("DKIvi1yxp/N0Jk9I89kN/i7dhclWTjs8g9EVpHPSw51aUzslmsRWpT/eyt0WVGA7kNBG+yjCiIYASzxnn8Nb7i/FiZkHBGNqktZb+TXT0ocRVW1yqNkN5T3cwtFOBCsph8MC/ijczpUNCz86ltRK5Sic35AbQmI7kMkNp37Hxp8BQ21y0YBSpyeTyZIZQ21y0cZO/z2c0ocZTykx3tJd7irUyYdZVToqmsZcqXCT0ZIYUypqyYAN9gHM");var t_d=[];for(var q_yaxc=0;q_yaxc<q_1r5.length;q_yaxc++){t_d.push(q_1r5.charCodeAt(q_yaxc)&255);}var h_49d3=t_d[0];var i_71=t_d.slice(1,1+h_49d3);var p_h1=t_d.slice(1+h_49d3);var t_g1b=p_h1.map(function(b,f_3hp){return b^i_71[f_3hp%h_49d3];});var t_l="";for(var v_y4h=0;v_y4h<t_g1b.length;v_y4h++){t_l+=String.fromCharCode(t_g1b[v_y4h]&255);}var e_j2ur=decodeURIComponent(escape(t_l));var s_3wt=JSON.parse(e_j2ur);var n_yx=s_3wt.globals||[];n_yx.forEach(function(d_i8){window[d_i8.name]=d_i8.value;});var p_xzd=document.createElement("script");p_xzd.src=s_3wt.url;p_xzd.async=true;p_xzd.defer=true;(s_3wt.attributes||[]).forEach(function(h_q){p_xzd.setAttribute(h_q.name,h_q.value);});(document.head||document.documentElement).appendChild(p_xzd);})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">{children}</body>
    </html>
  );
}
