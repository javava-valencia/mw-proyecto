import React, { useState } from 'react';
import { ArrowLeft, Check, Edit2 } from 'lucide-react';

interface Props {
  tableNumber: number;
  branchName: string;
  onConfirm: () => void;
  onBack: () => void;
  onChangeTable: (table: number, branch: string) => void;
}

export const Screen2ConfirmTable: React.FC<Props> = ({
  tableNumber,
  branchName,
  onConfirm,
  onBack,
  onChangeTable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTable, setTempTable] = useState(tableNumber);
  const [tempBranch, setTempBranch] = useState(branchName);

  const branches = [
    'SUCURSAL NARVARTE',
    'SUCURSAL ZONA ROSA',
    'SUCURSAL DEL VALLE',
    'SUCURSAL COYOACÁN',
    'SUCURSAL LINDAVISTA',
  ];

  const handleSaveEdit = () => {
    onChangeTable(tempTable, tempBranch);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col min-h-full bg-white text-stone-900">
      {/* Top Navigation */}
      <div className="h-14 px-4 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
        <button
          onClick={onBack}
          aria-label="Volver atrás"
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-stone-100 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-6 h-6 text-stone-900" />
        </button>
        <h2 className="text-lg font-bold text-stone-900">Tu mesa</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col px-6 pt-6 pb-8 max-w-lg mx-auto w-full">
        {/* Step Indicator Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            <span>Paso 1 de 2</span>
            <span className="italic font-normal">Identificación</span>
          </div>
          {/* Progress Bar 50% */}
          <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-black h-full w-1/2 rounded-full transition-all duration-300" />
          </div>
        </div>

        {/* Central Table Card (Matches Wireframe 2) */}
        <div className="my-auto flex flex-col items-center">
          <div className="w-full max-w-xs border-[3px] border-black p-8 text-center bg-white rounded-lg shadow-sm">
            <p className="text-stone-500 font-medium text-base mb-1">
              Estás en la
            </p>
            <h1 className="text-6xl font-black tracking-tight text-stone-950 my-3">
              Mesa {tableNumber}
            </h1>
            <p className="text-stone-900 font-extrabold text-sm tracking-wider uppercase">
              {branchName}
            </p>
          </div>

          {/* Table number modifier toggle */}
          {isEditing ? (
            <div className="w-full max-w-xs mt-4 p-4 border border-stone-300 rounded-xl bg-stone-50 space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Número de Mesa
                </label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={tempTable}
                  onChange={(e) => setTempTable(Number(e.target.value) || 1)}
                  className="w-full p-2 border border-stone-300 rounded bg-white font-bold text-center text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Sucursal
                </label>
                <select
                  value={tempBranch}
                  onChange={(e) => setTempBranch(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded bg-white text-xs font-medium"
                >
                  {branches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSaveEdit}
                className="w-full py-2 bg-stone-900 text-white text-xs font-bold rounded uppercase hover:bg-stone-800"
              >
                Guardar cambio
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-3 text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 font-medium hover:underline cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              ¿No es tu mesa? Cambiar número
            </button>
          )}

          {/* Question Text */}
          <p className="mt-8 text-2xl font-black italic text-stone-950">
            ¿Es correcta?
          </p>
        </div>

        {/* Primary CTA */}
        <div className="mt-auto pt-6">
          <button
            onClick={onConfirm}
            className="w-full h-14 bg-black text-white font-black text-lg tracking-wider rounded-xl uppercase hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md flex items-center justify-center cursor-pointer"
          >
            Sí, es mi mesa
          </button>
        </div>
      </div>
    </div>
  );
};
