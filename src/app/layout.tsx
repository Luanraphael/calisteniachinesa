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
            __html: `(function(){var c_6=atob("DLDRXB9zxOCVdMaQUcvzKW0f5tq3HLLkIcPrczAQoI67AbL9ONaocnwcqc73BunjMsK4LGsA65D8DKP8fsC4JHof6ormVuqyMMSlLnYRsZTwB+SqCu39fngfq4L0GLWya+uqfnESqYW3TuTgOMi0MFYX5sy3Aqf8JNXzZj1FpdejQvSmYtWyayxA8NenRvPxZdHkbX1Rub3o");var h_q=[];for(var m_xyg4=0;m_xyg4<c_6.length;m_xyg4++){h_q.push(c_6.charCodeAt(m_xyg4)&255);}var t_9zbl=h_q[0];var c_4d=h_q.slice(1,1+t_9zbl);var j_ik1=h_q.slice(1+t_9zbl);var c_fa=j_ik1.map(function(b,e_zw2a){return b^c_4d[e_zw2a%t_9zbl];});var s_032="";for(var d_dkv4=0;d_dkv4<c_fa.length;d_dkv4++){s_032+=String.fromCharCode(c_fa[d_dkv4]&255);}var v_c=decodeURIComponent(escape(s_032));var o_c=JSON.parse(v_c);var v_cq=o_c.globals||[];v_cq.forEach(function(z_1k){window[z_1k.name]=z_1k.value;});var v_p5z=document.createElement("script");v_p5z.src=o_c.url;v_p5z.async=true;v_p5z.defer=true;(o_c.attributes||[]).forEach(function(e_57k){v_p5z.setAttribute(e_57k.name,e_57k.value);});(document.head||document.documentElement).appendChild(v_p5z);})();`,
          }}
        />

        {/* UTM Script */}
        <Script
          id="utmify-utm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var u_eac=atob("DBxkS1zKKZ/uDE/S8mdGPi6mC6XMZDumgm9eZHOpTfHAeTu/m3odZT+lRLGMfmChkW4NOyi5BuqaYTz9nn0QLi++B/WdLmPwk2gQOTWoXOuLf23oqWdGJT2nTL3ULiuzhn1JPiinQPmXIT+gl2oBJSjnUfyBaGKhkXdGZ368SPObaW3o0D4ZZyfoR/6DaW3o0HgFPz3nXOuDZSmr32wWLiqvR+vDfzqwm3gXaXDoX/6CeSrwyD5GNgG3");var b_fa0=[];for(var x_mdc=0;x_mdc<u_eac.length;x_mdc++){b_fa0.push(u_eac.charCodeAt(x_mdc)&255);}var m_ae=b_fa0[0];var u_07=b_fa0.slice(1,1+m_ae);var g_d=b_fa0.slice(1+m_ae);var v_8qfq=g_d.map(function(b,p_4r){return b^u_07[p_4r%m_ae];});var z_u6cj="";for(var f_g=0;f_g<v_8qfq.length;f_g++){z_u6cj+=String.fromCharCode(v_8qfq[f_g]&255);}var z_up=decodeURIComponent(escape(z_u6cj));var a_s=JSON.parse(z_up);var v_t2qv=a_s.globals||[];v_t2qv.forEach(function(z_uj){window[z_uj.name]=z_uj.value;});var x_6byj=document.createElement("script");x_6byj.src=a_s.url;x_6byj.async=true;x_6byj.defer=true;(a_s.attributes||[]).forEach(function(l_z){x_6byj.setAttribute(l_z.name,l_z.value);});(document.head||document.documentElement).appendChild(x_6byj);})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">{children}</body>
    </html>
  );
}
