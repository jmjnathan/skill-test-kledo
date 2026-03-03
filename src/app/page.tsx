"use client";

import { useState, useMemo, useEffect } from "react";
import { TbWorld } from "react-icons/tb";
import { TbMap } from "react-icons/tb"; // IconMap
import { TbBuildingSkyscraper } from "react-icons/tb"; // IconCity
import { TbMapPin } from "react-icons/tb"; // IconPin
import { TbFilterX } from "react-icons/tb"; // IconReset
import { TbChevronDown } from "react-icons/tb"; // IconChevron

const IconGlobe = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconMap = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);
const IconCity = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect x="3" y="9" width="13" height="13" />
    <path d="M5 22V7l8-4v4" />
    <rect x="16" y="13" width="5" height="9" />
    <line x1="9" y1="22" x2="9" y2="14" />
    <rect x="6" y="11" width="3" height="3" />
    <rect x="11" y="11" width="3" height="3" />
  </svg>
);
const IconPin = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconReset = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const IconChevron = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const bg = "#F7F7F7";
const surface = "#FFFFFF";
const border = "#E4E4E4";
const textHigh = "#1A1A1A";
const textMid = "#6B6B6B";
const textLow = "#80a9e8";
const accentBg = "#F0F4FF";
const accent = "#6B8FD4";
const accentBorder = "#A8BFEF";
const gray = "#d0d4df";

const STORAGE_KEY = "regional_filter_local_storage";

interface SelectProps {
  label: string;
  icon: React.ReactNode;
  name?: string;
  value: number | null;
  options: { id: number; name: string }[];
  onChange: (id: number | null) => void;
  disabled?: boolean;
  placeholder: string;
}

function Select({
  label,
  icon,
  value,
  options,
  onChange,
  disabled,
  placeholder,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((e) => e.id === value)?.name || "";

  return (
    <div style={{ marginBottom: 18, position: "relative" }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: textMid,
          marginBottom: 6,
        }}>
        {label}
      </div>
      <div
        onClick={() => !disabled && setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          border: `1.5px solid ${
            open ? accentBorder : disabled ? "#EBEBEB" : border
          }`,
          borderRadius: 10,
          padding: "10px 13px",
          cursor: disabled ? "not-allowed" : "pointer",
          background: disabled ? "#FAFAFA" : surface,
          color: disabled ? textLow : selectedLabel ? textHigh : textMid,
          transition: "border-color 0.15s",
          userSelect: "none",
          boxShadow: open ? `0 0 0 3px ${accentBorder}30` : "none",
        }}>
        <span
          style={{
            color: disabled ? textLow : selectedLabel ? accent : textLow,
          }}>
          {icon}
        </span>
        <span
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: selectedLabel ? 500 : 400,
          }}>
          {selectedLabel || placeholder}
        </span>
        <span
          style={{
            color: textLow,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}>
          <TbChevronDown />
        </span>
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 50,
            background: surface,
            border: `1px solid ${border}`,
            borderRadius: 10,
            boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
            marginTop: 4,
            overflow: "hidden",
          }}>
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
              style={{
                padding: "10px 14px",
                fontSize: 14,
                cursor: "pointer",
                background: opt.id === value ? accentBg : surface,
                color: opt.id === value ? accent : textHigh,
                fontWeight: opt.id === value ? 500 : 400,
              }}
              onMouseEnter={(e) => {
                if (opt.id !== value)
                  e.currentTarget.style.background = "#F3F3F3";
              }}
              onMouseLeave={(e) => {
                if (opt.id !== value)
                  e.currentTarget.style.background = surface;
              }}>
              {opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [dataList, setDataList] = useState<{
    provinces: { id: number; name: string }[];
    regencies: { id: number; name: string; province_id: number }[];
    districts: { id: number; name: string; regency_id: number }[];
  } | null>(null);

  const [provinsiId, setProvinsiId] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const dataSaved = localStorage.getItem(STORAGE_KEY);
    return dataSaved ? JSON.parse(dataSaved).provinsiId ?? null : null;
  });
  const [regencyId, setRegencyId] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const dataSaved = localStorage.getItem(STORAGE_KEY);
    return dataSaved ? JSON.parse(dataSaved).regencyId ?? null : null;
  });
  const [districtId, setDistrictId] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const dataSaved = localStorage.getItem(STORAGE_KEY);
    return dataSaved ? JSON.parse(dataSaved).districtId ?? null : null;
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ provinsiId, regencyId, districtId })
    );
  }, [provinsiId, regencyId, districtId]);

  const getData = async () => {
    try {
      const response = await fetch("/data/indonesia_regions.json");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setDataList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const selectedProvinsi = dataList?.provinces.find((p) => p.id === provinsiId);
  const selectedRegency = dataList?.regencies.find((r) => r.id === regencyId);
  const selectedDistrict = dataList?.districts.find((d) => d.id === districtId);

  const regencyOptions = useMemo(
    () => dataList?.regencies.filter((r) => r.province_id === provinsiId) ?? [],
    [dataList, provinsiId]
  );
  const districtOptions = useMemo(
    () => dataList?.districts.filter((d) => d.regency_id === regencyId) ?? [],
    [dataList, regencyId]
  );

  const handleProvinsi = (id: number | null) => {
    setProvinsiId(id);
    setRegencyId(null);
    setDistrictId(null);
  };
  const handleRegency = (id: number | null) => {
    setRegencyId(id);
    setDistrictId(null);
  };
  const handleReset = () => {
    setProvinsiId(null);
    setRegencyId(null);
    setDistrictId(null);
  };

  const crumbs = [
    "Indonesia",
    selectedProvinsi?.name,
    selectedRegency?.name,
    selectedDistrict?.name,
  ].filter(Boolean);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Inter', system-ui, sans-serif",
        background: bg,
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* ── sidebar ── */}
      <div
        style={{
          width: 272,
          minHeight: "100vh",
          background: surface,
          borderRight: `1px solid ${border}`,
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 32,
          }}>
          <div
            style={{
              background: accentBg,
              color: accent,
              borderRadius: 9,
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <TbWorld />
          </div>
          <span style={{ fontWeight: 600, fontSize: 14, color: textHigh }}>
            Frontend Assessment - Jonathan Christiawan
          </span>
        </div>

        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: textLow,
            marginBottom: 16,
          }}>
          FILTER WILAYAH
        </div>

        <Select
          label="PROVINSI"
          icon={<TbMap />}
          value={provinsiId}
          options={dataList?.provinces ?? []}
          onChange={handleProvinsi}
          placeholder="Pilih Provinsi"
        />
        <Select
          label="KOTA/KABUPATEN"
          icon={<TbBuildingSkyscraper />}
          value={regencyId}
          options={regencyOptions}
          onChange={handleRegency}
          disabled={!provinsiId}
          placeholder="Pilih Kota/Kabupaten"
        />
        <Select
          label="KECAMATAN"
          icon={<TbMapPin />}
          value={districtId}
          options={districtOptions}
          onChange={setDistrictId}
          disabled={!regencyId}
          placeholder="Pilih Kecamatan"
        />

        <div style={{ flex: 1 }} />

        <button
          onClick={handleReset}
          style={{
            width: "100%",
            padding: "11px",
            border: `1px solid ${accentBorder}`,
            borderRadius: 10,
            background: surface,
            color: accent,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = accentBg)}
          onMouseLeave={(e) => (e.currentTarget.style.background = surface)}>
          <TbFilterX /> RESET
        </button>
      </div>

      {/* ── main ── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          className="breadcrumb"
          style={{
            padding: "18px 44px",
            borderBottom: `1px solid ${border}`,
            background: surface,
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontSize: 13,
              flexWrap: "wrap",
            }}>
            {crumbs.map((c, i) => (
              <span
                key={c}
                style={{ display: "flex", alignItems: "center", gap: 7 }}>
                {i > 0 && <span style={{ color: textLow }}>›</span>}
                <span
                  style={{
                    color: i === crumbs.length - 1 ? accent : textMid,
                    fontWeight: i === crumbs.length - 1 ? 500 : 400,
                  }}>
                  {c}
                </span>
              </span>
            ))}
            {crumbs.length === 0 && (
              <span style={{ color: textLow }}>Belum ada wilayah dipilih</span>
            )}
          </div>
        </div>

        {/* main display */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px",
          }}>
          {!selectedProvinsi ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 14 }}>🗺️</div>
              <div style={{ fontSize: 15, fontWeight: 400, color: textMid }}>
                Pilih provinsi untuk memulai
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", width: "100%", maxWidth: 560 }}>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    color: textLow,
                    marginBottom: 10,
                  }}>
                  PROVINSI
                </div>
                <div
                  style={{
                    fontSize: 60,
                    fontWeight: 700,
                    color: textHigh,
                    lineHeight: 1.1,
                    marginBottom: selectedRegency ? 28 : 0,
                  }}>
                  {selectedProvinsi.name}
                </div>
              </div>

              {selectedRegency && (
                <>
                  <div
                    style={{ color: gray, fontSize: 20, marginBottom: 28 }}>
                    ↓
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        color: textLow,
                        marginBottom: 10,
                      }}>
                      KOTA / KABUPATEN
                    </div>
                    <div
                      style={{
                        fontSize: 52,
                        fontWeight: 600,
                        color: textHigh,
                        lineHeight: 1.1,
                        marginBottom: selectedDistrict ? 28 : 0,
                      }}>
                      {selectedRegency.name}
                    </div>
                  </div>
                </>
              )}

              {selectedDistrict && (
                <>
                  <div
                    style={{ color: gray, fontSize: 20, marginBottom: 28 }}>
                    ↓
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        color: textLow,
                        marginBottom: 10,
                      }}>
                      KECAMATAN
                    </div>
                    <div
                      style={{
                        fontSize: 44,
                        fontWeight: 600,
                        color: textHigh,
                        lineHeight: 1.1,
                      }}>
                      {selectedDistrict.name}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
