import React, { useState } from 'react';
import { 
  Palette, Type, Layers, CheckSquare, Sparkles, Smartphone, 
  Users, CreditCard, Bell, Plus, Minus, Trash2, Check, ArrowRight,
  Split, GitMerge, FileText, Image as ImageIcon
} from 'lucide-react';

export const DesignSystemView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'components' | 'wireframes' | 'flow'>('components');
  const [demoCount, setDemoCount] = useState(1);
  const [demoTip, setDemoTip] = useState<'10' | '15' | '20' | 'otra'>('10');
  const [demoSize, setDemoSize] = useState('Grande');

  const wireframes = [
    {
      num: 1,
      title: 'Pantalla de Inicio / Onboarding',
      desc: 'Pide desde tu celular · Explicación de 3 pasos (Mesa, Platillos, Pago) · Botón Empezar / Pedir con Mesero',
      img: '/assets/aistudio/1_Casa_de_Ton_o2tTK5A_e02d8abf.png',
    },
    {
      num: 2,
      title: 'Paso 1: Confirmación de Mesa',
      desc: 'Verificación de la mesa detectada por QR ("Estás en la Mesa 12 Narvarte") con botón "SÍ, ES MI MESA"',
      img: '/assets/aistudio/2_Casa_de_Ton_oZDKrDf_324436fb.png',
    },
    {
      num: 3,
      title: 'Paso 2: Nombre & Comensales',
      desc: 'Identificación con "¿Cómo te llamamos??", lista de personas ya en mesa y opción "Agregar a alguien sin celular"',
      img: '/assets/aistudio/3_Casa_de_Ton_omuoL4r_5b4a37bc.png',
    },
    {
      num: 4,
      title: 'Menú Digital de la Mesa',
      desc: 'Buscador, tabs de categorías (Pozoles, Antojitos), platillos con precios y botón sticky "VER PEDIDO"',
      img: '/assets/aistudio/4_Casa_de_Ton_ofMkvmh_6b32c73a.png',
    },
    {
      num: 5,
      title: 'Modal de Platillo & Opciones',
      desc: 'Selector obligatorio de tamaño (Chico/Grande), ingredientes, opción de compartir plato y botón de agregar',
      img: '/assets/aistudio/5_Casa_de_Ton_om0YN9I_e643537d.png',
    },
    {
      num: 6,
      title: 'Revisión de Pedido (Ronda 1)',
      desc: 'Desglose de platillos propios y compartidos ("Tu parte: $34.33 de $103"), selector de cantidad y Enviar a Cocina',
      img: '/assets/aistudio/6_Casa_de_Ton_oEegfAx_25b138cf.png',
    },
    {
      num: 7,
      title: 'Tracker de Cocina',
      desc: 'Progreso vertical: Recibido -> En preparación -> En camino a tu mesa, más botón para "Pedir otra ronda"',
      img: '/assets/aistudio/7_Casa_de_Ton_oCHJIly_5234f996.png',
    },
    {
      num: 8,
      title: 'Estado de la Mesa & Fusión de Cuentas',
      desc: 'Total de la mesa ($820), lista de comensales con estado (Pendiente / PAGADO) y función para mezclar cuentas',
      img: '/assets/aistudio/8_Casa_de_Ton_ou2EVDc_169eda9e.png',
    },
    {
      num: 9,
      title: 'Mi Cuenta & Propina',
      desc: 'Desglose final con selector de propina (10%, 15%, 20%, Otra) y elección: Pagar con tarjeta o Pagarle al mesero',
      img: '/assets/aistudio/9_Casa_de_Ton_oYQxPcd_16c1e4a3.png',
    },
    {
      num: 10,
      title: 'Confirmación de Mesero en Camino',
      desc: 'Alerta con el monto exacto a tener listo en efectivo o tarjeta ("Ten listo tu pago de $143.36")',
      img: '/assets/aistudio/10_Casa_de_Ton_oEpu0Qt_39f319a9.png',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Design System Header */}
      <div className="mb-8 border-b border-stone-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded">
                Design System v1.0
              </span>
              <span className="text-xs font-semibold text-stone-500">
                La Casa de Toño · Comanda Digital
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight">
              Sistema de Diseño de Comanda Colaborativa
            </h1>
            <p className="text-stone-600 text-sm mt-2 max-w-3xl leading-relaxed">
              Basado en los 10 wireframes de la propuesta oficial. Diseñado para digitalizar la clásica hojita de papel de La Casa de Toño, permitiendo a cada comensal pedir desde su celular, dividir cuentas automáticamente y mezclar cuentas entre comensales antes del pago final.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'components', label: 'Componentes Atómicos', icon: Layers },
            { id: 'tokens', label: 'Tokens & Fundamentos', icon: Palette },
            { id: 'flow', label: 'Flujo de División & Fusión', icon: Split },
            { id: 'wireframes', label: 'Los 10 Wireframes Originales', icon: ImageIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-black'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: COMPONENTS */}
      {activeTab === 'components' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          {/* Buttons Section */}
          <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
            <h2 className="text-lg font-black text-stone-950 mb-1">1. Botones & Acciones Primarias</h2>
            <p className="text-xs text-stone-500 mb-6">
              Botones de alto contraste inspirados en la estética monocromática y contundente de La Casa de Toño.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-500 block">Botón Primario (CTA Full):</span>
                <button className="w-full h-14 bg-black text-white font-black text-base tracking-wider rounded-xl uppercase hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-sm">
                  <span>Empezar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-stone-400">Usado en inicio, confirmación de mesa y pago.</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-500 block">Botón Secundario Outline:</span>
                <button className="w-full h-14 border-2 border-black bg-white text-stone-950 font-black text-base tracking-wider rounded-xl uppercase hover:bg-stone-50 transition-all flex items-center justify-center gap-2">
                  <span>+ Agregar más platillos</span>
                </button>
                <p className="text-[11px] text-stone-400">Para acciones complementarias sin competir con el CTA.</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-500 block">Botón de Servicio "Mesero":</span>
                <div className="flex items-center gap-3">
                  <button className="flex flex-col items-center justify-center border-2 border-black rounded-md px-4 py-2 bg-white hover:bg-stone-50 transition-all shadow-xs">
                    <Bell className="w-5 h-5 fill-black text-black" />
                    <span className="text-[10px] font-black tracking-wider uppercase mt-0.5">
                      Mesero
                    </span>
                  </button>
                  <p className="text-xs text-stone-600 font-medium leading-tight">
                    Acceso rápido en cabecera para solicitar cuenta, cubiertos o auxilio.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Steppers & Quantity Controls */}
          <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
            <h2 className="text-lg font-black text-stone-950 mb-1">2. Selectores de Cantidad y Badges de División</h2>
            <p className="text-xs text-stone-500 mb-6">
              Controles táctiles de $\ge 44$px para evitar errores al ordenar y chips para indicar platillos compartidos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Stepper Interactive demo */}
              <div className="p-4 border border-stone-200 rounded-xl bg-stone-50">
                <span className="text-xs font-bold text-stone-600 block mb-3">Control de Cantidad (Interactivo):</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-300 rounded-lg bg-white h-11 px-2 shadow-2xs">
                    <button
                      onClick={() => setDemoCount(Math.max(1, demoCount - 1))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 rounded text-stone-700 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-black text-base tabular-nums">
                      {demoCount}
                    </span>
                    <button
                      onClick={() => setDemoCount(demoCount + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 rounded text-stone-700 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button className="w-11 h-11 border border-stone-300 rounded-lg flex items-center justify-center text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Shared badge demo */}
              <div className="p-4 border border-stone-200 rounded-xl bg-stone-50">
                <span className="text-xs font-bold text-stone-600 block mb-3">Badge de Platillo Compartido (Wireframe 6):</span>
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-stone-300 bg-white text-xs font-bold text-stone-800 shadow-2xs">
                    <Users className="w-3.5 h-3.5 text-stone-600" />
                    <span>👥 Compartido con Ana y Luis</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Tu parte: <strong className="text-black tabular-nums">$34.33</strong> de $103
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Radio Cards & Tipping Segmented Control */}
          <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
            <h2 className="text-lg font-black text-stone-950 mb-1">3. Radio Cards y Selector de Propinas</h2>
            <p className="text-xs text-stone-500 mb-6">
              Selección rápida de porciones y propina (10%, 15%, 20%, Otra) con cálculo automático en tiempo real.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Radio size demo */}
              <div>
                <span className="text-xs font-bold text-stone-600 block mb-2">Selector de Tamaño (Wireframe 5):</span>
                <div className="space-y-2">
                  {[
                    { name: 'Chico', price: 96 },
                    { name: 'Grande', price: 103 },
                  ].map((s) => {
                    const isSelected = demoSize === s.name;
                    return (
                      <div
                        key={s.name}
                        onClick={() => setDemoSize(s.name)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-black bg-stone-50 shadow-xs'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-black' : 'border-stone-300'
                            }`}
                          >
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                          </div>
                          <span className="font-extrabold text-sm text-stone-900">{s.name}</span>
                        </div>
                        <span className="font-black text-sm text-stone-900 tabular-nums">${s.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tips Demo */}
              <div>
                <span className="text-xs font-bold text-stone-600 block mb-2">Selector de Propina (Wireframe 9):</span>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {(['10', '15', '20', 'otra'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setDemoTip(t)}
                      className={`h-11 rounded-xl font-black text-sm transition-all cursor-pointer ${
                        demoTip === t
                          ? 'bg-black text-white shadow-xs'
                          : 'bg-white text-stone-900 border border-stone-300 hover:border-black'
                      }`}
                    >
                      {t === 'otra' ? 'Otra' : `${t}%`}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-stone-500">
                  Propina calculada: <strong className="text-black tabular-nums">${(130.33 * (demoTip === 'otra' ? 0.12 : Number(demoTip) / 100)).toFixed(2)}</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Kitchen Tracker Stepper */}
          <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
            <h2 className="text-lg font-black text-stone-950 mb-1">4. Stepper Vertical de Cocina</h2>
            <p className="text-xs text-stone-500 mb-6">
              El estado de la orden en tiempo real para reducir la ansiedad del comensal.
            </p>

            <div className="max-w-xs pl-2">
              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-stone-950 text-white flex items-center justify-center shrink-0 z-10">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <p className="font-extrabold text-sm text-stone-950">Recibido</p>
                  <p className="text-xs text-stone-500">Impreso en cocina</p>
                </div>
                <div className="absolute left-3.5 top-7 w-[2px] h-8 bg-stone-900" />
              </div>

              <div className="h-6" />

              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full border-[3px] border-stone-950 bg-white flex items-center justify-center shrink-0 z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-950 animate-pulse" />
                </div>
                <div>
                  <p className="font-extrabold text-sm text-stone-950">En preparación</p>
                  <p className="text-xs text-stone-500">Preparando caldo y guarniciones</p>
                </div>
                <div className="absolute left-3.5 top-7 w-[2px] h-8 bg-stone-200" />
              </div>

              <div className="h-6" />

              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full border-2 border-stone-300 bg-white flex items-center justify-center shrink-0 z-10" />
                <div>
                  <p className="font-semibold text-sm text-stone-400">En camino a tu mesa</p>
                  <p className="text-xs text-stone-400">Servido caliente por el mesero</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: TOKENS */}
      {activeTab === 'tokens' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Colors */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
            <h2 className="text-lg font-black text-stone-950 mb-4">Paleta Cromática Oficial</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-20 bg-black rounded-xl border border-stone-200 flex items-center justify-center text-white font-mono text-xs font-bold">
                  #000000
                </div>
                <p className="font-black text-sm text-stone-950">Negro Toño</p>
                <p className="text-xs text-stone-500">Botones primarios, recuadros y títulos display.</p>
              </div>

              <div className="space-y-2">
                <div className="h-20 bg-stone-950 rounded-xl border border-stone-200 flex items-center justify-center text-white font-mono text-xs font-bold">
                  #0C0A09
                </div>
                <p className="font-black text-sm text-stone-950">Piedra Obsidiana</p>
                <p className="text-xs text-stone-500">Tarjetas de comensal activo y encabezados.</p>
              </div>

              <div className="space-y-2">
                <div className="h-20 bg-stone-100 rounded-xl border border-stone-300 flex items-center justify-center text-stone-800 font-mono text-xs font-bold">
                  #F5F5F4
                </div>
                <p className="font-black text-sm text-stone-950">Blanco Hojita</p>
                <p className="text-xs text-stone-500">Superficies estructurales y fondos neutros.</p>
              </div>

              <div className="space-y-2">
                <div className="h-20 bg-emerald-600 rounded-xl border border-stone-200 flex items-center justify-center text-white font-mono text-xs font-bold">
                  #059669
                </div>
                <p className="font-black text-sm text-stone-950">Verde Pagado / Éxito</p>
                <p className="text-xs text-stone-500">Indicadores de comensal PAGADO y pedidos en línea.</p>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
            <h2 className="text-lg font-black text-stone-950 mb-4">Tipografía & Jerarquía</h2>
            <div className="space-y-6">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <p className="text-xs font-mono text-stone-500 mb-1">Headline Italic Display (Plus Jakarta Sans 900 Italic)</p>
                <p className="text-3xl font-black italic text-stone-950">
                  ¿Cómo te llamamos?? / ¿Es correcta?
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <p className="text-xs font-mono text-stone-500 mb-1">Numeración Tabular (font-mono tabular-nums)</p>
                <p className="text-2xl font-black text-stone-950 tabular-nums">
                  $130.33 + $34.33 = $164.66
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <p className="text-xs font-mono text-stone-500 mb-1">Cuerpo de Texto y Metadatos (Plus Jakarta Sans 500 / 600)</p>
                <p className="text-sm text-stone-700 leading-relaxed">
                  Nuestro tradicional pozole rojo con granos de maíz cacahuazintle. Incluye rábano, lechuga y limón.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FLOW */}
      {activeTab === 'flow' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
            <h2 className="text-lg font-black text-stone-950 mb-2">
              Flujo de División y Fusión de Cuentas
            </h2>
            <p className="text-xs text-stone-500 mb-6 max-w-2xl leading-relaxed">
              Resuelve el problema central planteado: cómo evitar que una mesa de amigos o familia tenga problemas para calcular quién debe qué, permitiendo ordenar individualmente y decidir la agrupación de pagos antes de pedir la cuenta final.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 border-2 border-stone-200 rounded-xl bg-stone-50 flex flex-col">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm mb-3">
                  1
                </div>
                <h3 className="font-extrabold text-base text-stone-950 mb-1">
                  Comanda Individual Sincronizada
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Cada comensal escanea el QR desde su propio teléfono, ingresa su nombre y elige sus platillos. Si ordenan un platillo para compartir (ej. pozole grande al centro), el sistema divide el costo automáticamente entre los seleccionados.
                </p>
              </div>

              <div className="p-5 border-2 border-stone-900 rounded-xl bg-stone-50 flex flex-col shadow-xs">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm mb-3">
                  2
                </div>
                <h3 className="font-extrabold text-base text-stone-950 mb-1">
                  Fusión de Cuentas (Mezclar con otro)
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Antes de pedir la cuenta al mesero, 2 o más comensales pueden presionar <strong>"Mezclar mi cuenta"</strong> (ej. Dani + Ana). El sistema consolida sus platillos en un único ticket conjunto, manteniendo separados a los demás integrantes.
                </p>
              </div>

              <div className="p-5 border-2 border-stone-200 rounded-xl bg-stone-50 flex flex-col">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm mb-3">
                  3
                </div>
                <h3 className="font-extrabold text-base text-stone-950 mb-1">
                  Ticket Final Inteligente para el Mesero
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  El mesero recibe en su terminal o imprime exactamente las cuentas según la decisión de la mesa: o un ticket general de $820, o tickets por comensal/pareja sin tener que calcular montos a mano en la mesa.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WIREFRAMES COMPARISON */}
      {activeTab === 'wireframes' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
            <h2 className="text-lg font-black text-stone-950 mb-2">
              Galería de los 10 Wireframes de Referencia
            </h2>
            <p className="text-xs text-stone-500 mb-6">
              Las 10 pantallas entregadas para la propuesta digital de La Casa de Toño, recreadas de forma pixel-perfect y 100% interactiva.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wireframes.map((wf) => (
                <div key={wf.num} className="border border-stone-200 rounded-xl p-4 bg-stone-50/50 flex flex-col hover:border-black transition-colors">
                  <div className="aspect-9/16 max-h-72 rounded-lg overflow-hidden border border-stone-300 bg-white mb-3 shadow-xs">
                    <img
                      src={wf.img}
                      alt={wf.title}
                      className="w-full h-full object-contain p-1"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {wf.num}
                    </span>
                    <h3 className="font-black text-sm text-stone-950 truncate">{wf.title}</h3>
                  </div>
                  <p className="text-xs text-stone-600 leading-snug">{wf.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
