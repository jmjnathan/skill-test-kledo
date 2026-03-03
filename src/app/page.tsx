"use client";

import { useState, useMemo, useEffect } from "react";
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
  name,
  onChange,
  disabled,
  placeholder,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((e: any) => e.id === value)?.name || "";

  return (
    <div style={{ marginBottom: 20, position: "relative" }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: "#94A3B8",
          marginBottom: 8,
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
            open ? "#3B82F6" : disabled ? "#E2E8F0" : "#CBD5E1"
          }`,
          borderRadius: 12,
          padding: "11px 14px",
          cursor: disabled ? "not-allowed" : "pointer",
          background: disabled ? "#F8FAFC" : "#fff",
          color: disabled ? "#94A3B8" : selectedLabel ? "#1E293B" : "#94A3B8",
          transition: "all 0.15s",
          userSelect: "none",
          boxShadow: open ? "0 0 0 3px #3B82F615" : "none",
        }}>
        <span
          style={{
            color: disabled ? "#CBD5E1" : selectedLabel ? "#3B82F6" : "#94A3B8",
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
            color: "#94A3B8",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}>
          <IconChevron />
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
            background: "#fff",
            border: "1.5px solid #E2E8F0",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            marginTop: 4,
            overflow: "hidden",
          }}>
          {options.map((opt: any) => (
            <div
              key={opt.id}
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
              style={{
                padding: "10px 16px",
                fontSize: 14,
                cursor: "pointer",
                background: opt.id === value ? "#EFF6FF" : "#fff",
                color: opt.id === value ? "#3B82F6" : "#374151",
                fontWeight: opt.id === value ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (opt.id !== value)
                  e.currentTarget.style.background = "#F8FAFC";
              }}
              onMouseLeave={(e) => {
                if (opt.id !== value) e.currentTarget.style.background = "#fff";
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
  const [provinsiId, setProvinsiId] = useState(null);
  const [regencyId, setRegencyId] = useState(null);
  const [districtId, setDistrictId] = useState(null);

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

  const selectedProvinsi = dataList?.provinces.find(
    (prov) => prov.id === provinsiId
  );
  const selectedRegency = dataList?.regencies.find(
    (reg) => reg.id === regencyId
  );
  const selectedDistrict = dataList?.districts.find(
    (dist) => dist.id === districtId
  );

  const regencyOptions = useMemo(
    () =>
      dataList?.regencies.filter(
        (regency) => regency.province_id === provinsiId
      ),
    [provinsiId]
  );
  const districtOptions = useMemo(
    () => dataList?.districts.filter((dist) => dist.regency_id === regencyId),
    [regencyId]
  );

  const handleProvinsi = (id: any) => {
    setProvinsiId(id);
    setRegencyId(null);
    setDistrictId(null);
  };
  const handleRegency = (id: any) => {
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
        background: "#F1F5F9",
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .reset-btn:hover { background: #EFF6FF !important; }
      `}</style>

      {/* sidebar */}
      <div
        style={{
          width: 280,
          minHeight: "100vh",
          background: "#fff",
          borderRight: "1px solid #E2E8F0",
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 36,
          }}>
          <div
            style={{
              background: "#EFF6FF",
              color: "#3B82F6",
              borderRadius: 10,
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <IconGlobe />
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#1E293B" }}>
            Frontend Assesement
          </span>
        </div>

        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#94A3B8",
            marginBottom: 20,
          }}>
          FILTER WILAYAH
        </div>

        <Select
          label="PROVINSI"
          name="province"
          icon={<IconMap />}
          value={provinsiId}
          options={dataList?.provinces || []}
          onChange={handleProvinsi}
          placeholder="Pilih Provinsi"
          disabled={false}
        />

        <Select
          label="KOTA/KABUPATEN"
          name="regency"
          icon={<IconCity />}
          value={regencyId}
          options={regencyOptions || []}
          onChange={handleRegency}
          disabled={!provinsiId}
          placeholder="Pilih Kota/Kabupaten"
        />

        <Select
          label="KECAMATAN"
          name="district"
          icon={<IconPin />}
          value={districtId}
          options={districtOptions || []}
          onChange={(id: any) => setDistrictId(id)}
          disabled={!regencyId}
          placeholder="Pilih Kecamatan"
        />

        <div style={{ flex: 1 }} />

        <button
          className="reset-btn"
          onClick={handleReset}
          style={{
            width: "100%",
            padding: "12px",
            border: "1.5px solid #3B82F6",
            borderRadius: 12,
            background: "#fff",
            color: "#3B82F6",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background 0.15s",
          }}>
          <IconReset /> RESET
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* breadcrumb */}
        <div
          style={{
            padding: "20px 48px",
            borderBottom: "1px solid #E2E8F0",
            background: "#fff",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              flexWrap: "wrap",
            }}>
            {crumbs.map((c, i) => (
              <span
                key={c}
                style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {i > 0 && <span style={{ color: "#CBD5E1" }}> </span>}
                <span
                  style={{
                    color: i === crumbs.length - 1 ? "#3B82F6" : "#94A3B8",
                    fontWeight: i === crumbs.length - 1 ? 600 : 400,
                  }}>
                  {c}
                </span>
              </span>
            ))}
            {crumbs.length === 0 && (
              <span style={{ color: "#CBD5E1" }}>
                Belum ada wilayah dipilih
              </span>
            )}
          </div>
        </div>

        {/* display */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px",
          }}>
          {!selectedProvinsi ? (
            <div style={{ textAlign: "center", color: "#CBD5E1" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🗺️</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>
                Pilih provinsi untuk memulai
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", width: "100%", maxWidth: 600 }}>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "#94A3B8",
                    marginBottom: 10,
                  }}>
                  PROVINSI
                </div>
                <div
                  style={{
                    fontSize: 64,
                    fontWeight:  600,
                    color: "#1E293B",
                    lineHeight: 1.1,
                    marginBottom: selectedRegency ? 32 : 0,
                  }}>
                  {selectedProvinsi.name}
                </div>
              </div>

              {selectedRegency && (
                <>
                  <div
                    style={{
                      color: "#CBD5E1",
                      fontSize: 24,
                      marginBottom: 32,
                    }}>
                    ↓
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "#94A3B8",
                        marginBottom: 10,
                      }}>
                      KOTA / KABUPATEN
                    </div>
                    <div
                      style={{
                        fontSize: 56,
                        fontWeight: 600,
                        color: "#1E293B",
                        lineHeight: 1.1,
                        marginBottom: selectedDistrict ? 32 : 0,
                      }}>
                      {selectedRegency.name}
                    </div>
                  </div>
                </>
              )}

              {selectedDistrict && (
                <>
                  <div
                    style={{
                      color: "#CBD5E1",
                      fontSize: 24,
                      marginBottom: 32,
                    }}>
                    ↓
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "#94A3B8",
                        marginBottom: 10,
                      }}>
                      KECAMATAN
                    </div>
                    <div
                      style={{
                        fontSize: 48,
                        fontWeight: 600,
                        color: "#1E293B",
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
      </div>
    </div>
  );
}
