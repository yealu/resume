"use client";
import Image from "next/image";
import Head from "next/head";
import { useRef, useState, useEffect } from "react";

const SECTION_IDS = [
  "super-villain-labs",
  "plutos-ds",
  "ilrowa",
  "gorura",
  "taedaesan",
];

export default function Home() {
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    SECTION_IDS.forEach((id) => {
      sectionRefs.current[id] = document.getElementById(id);
    });
  }, []);

  // 네비게이션 클릭: 같은 섹션이면 해제, 다르면 하이라이트
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    if (highlighted === id) {
      setHighlighted(null);
      return;
    }
    setHighlighted(id);
    const target = document.getElementById(id);
    const navBar = document.getElementById("nav-bar");
    const navBarHeight = navBar?.offsetHeight || 35;
    const desiredGap = 64; // 빨간 박스만큼의 여백(px)
    if (target) {
      const elementY = window.scrollY + target.getBoundingClientRect().top;
      const offsetPosition = elementY - navBarHeight - desiredGap;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setTimeout(() => {
        const newElementY = window.scrollY + target.getBoundingClientRect().top;
        const newOffset = newElementY - navBarHeight - desiredGap;
        if (Math.abs(window.scrollY - newOffset) > 2) {
          window.scrollTo({ top: newOffset });
        }
      }, 400);
    }
  };

  // 오버레이 클릭 시 하이라이트 해제
  const handleOverlayClick = () => setHighlighted(null);

  // 하이라이트 스타일
  const highlightStyle =
    "relative z-30 bg-white drop-shadow-2xl ring-4 ring-blue-400 ring-offset-2 ring-offset-white transition-all duration-300 p-8 sm:p-10 mx-[-1.5rem] sm:mx-[-2.5rem] rounded-xl";

  // 하이라이트된 기업명 버튼 스타일
  const navButton = (id: string, label: string) => (
    <a
      href={`#${id}`}
      onClick={e => handleNavClick(e, id)}
      className={
        `px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm mx-1 border-none whitespace-nowrap ` +
        (highlighted === id
          ? "bg-blue-900 text-white font-bold shadow-lg scale-105"
          : "bg-white text-blue-900 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-300 hover:text-blue-900 active:bg-blue-900 active:text-white")
      }
      style={{ minWidth: 110, textAlign: 'center' }}
    >
      {label}
    </a>
  );

  return (
    <>
      <Head>
        <title>경력기술서</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      {/* 오버레이 */}
      {highlighted && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-20 cursor-pointer transition-all duration-300"
          onClick={handleOverlayClick}
        />
      )}
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-10 shadow-lg rounded-lg mt-8 font-['Roboto',_sans-serif] relative z-30">
        <h1 className="text-3xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-6">경력기술서</h1>
        <h2 className="text-xl font-bold text-blue-900 mt-8 mb-2">개요</h2>
        <p className="mb-6 text-gray-700">재무/회계 전문성을 바탕으로 데이터 기반 의사결정과 운영 효율화를 이끌어온 전문가입니다. 슈퍼빌런랩스와 플루토스디에스에서 재무 관리, 가상자산 관리, 급여/임금 제도 설계를 주도하며, AI 및 파워쿼리를 활용한 데이터 처리와 시각화로 업무 효율성을 극대화했습니다. 복잡한 데이터를 직관적으로 표현하여 경영진의 신속한 의사결정을 지원하는 데 강점을 보유하고 있습니다.</p>
        {/* 네비게이션 바 */}
        <div
          id="nav-bar"
          className="sticky top-5 bg-gray-50 mt-4 mb-12 shadow-lg z-50 h-auto flex-nowrap flex items-center justify-center rounded-xl py-3 px-4 gap-2 min-w-0 max-w-full overflow-x-auto"
        >
          {navButton("super-villain-labs", "슈퍼빌런랩스")}
          {navButton("plutos-ds", "플루토스디에스")}
          {navButton("ilrowa", "주식회사 일로와")}
          {navButton("gorura", "고르라")}
          {navButton("taedaesan", "(주)태대산")}
        </div>
        {/* 경력 및 성과 섹션들 */}
        {/* 슈퍼빌런랩스 */}
        <section
          id="super-villain-labs"
          className={`mt-24 pt-16 sm:pt-20 transition-all duration-300 ${highlighted === "super-villain-labs" ? highlightStyle : ""}`}
        >
          <h3 className="text-lg font-bold text-gray-800 mt-10 mb-1">슈퍼빌런랩스 (SupervillainLabsInc.)</h3>
          <p className="text-gray-700 font-semibold mb-1">People Team/Finance Manager | 2024.01 - 2025.02</p>
          <h4 className="text-base font-bold text-gray-600 mt-4 mb-1">핵심 키워드</h4>
          <ul className="list-disc pl-6 mb-2 text-gray-700 text-sm">
            <li>재무 관리 | 데이터 기반 의사결정 | 가상자산 관리 | 세무 신고 | 급여 관리</li>
          </ul>
          <h4 className="text-base font-bold text-gray-600 mt-4 mb-1">세부 내용</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-2 bg-gray-50 rounded">
              <thead>
                <tr>
                  <th className="bg-blue-900 text-white font-bold py-2 px-3 w-1/5">구분</th>
                  <th className="bg-gray-100 text-gray-900 font-bold py-2 px-3">내용</th>
                </tr>
              </thead>
              <tbody className="text-sm text-black">
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">성과</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>월말/분기별 결산 소요 시간 50% 이상 단축(회계법인 2개월 → 자체 월결산 1개월).</li>
                      <li>각종 신고 업무 누락 및 재신고율 0건 달성.</li>
                      <li>가상자산 트랜잭션 관리로 회계 및 감사 대비 체계 구축.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">역할</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>경영진 의사결정에 필요한 재무 보고서 작성 및 프로젝트별 손익계산서 작성.</li>
                      <li>일일/주간/월간 자금 현황 관리, 부서(프로젝트)별 손익 관리.</li>
                      <li>가상자산 관리: 지갑별 트랜잭션 관리, 벨리데이터 위탁 운영, OTC 코인 매출 관리.</li>
                      <li>세무 신고 관리: 부가세, 원천세 신고, 외화 매출 및 수출실적명세서 작성.</li>
                      <li>급여 관리: 약 40명 급여 산출 및 지급, 사회보험 및 원천세 신고 관리.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">영향력/기여도</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>결산 효율화로 경영진 보고 속도 개선.</li>
                      <li>가상자산 관리 체계화로 재무 투명성 및 감사 대응력 강화.</li>
                      <li>급여 관리 및 세무 신고 체계화로 조직 운영 안정성 제고.</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        {/* 플루토스디에스 */}
        <section
          id="plutos-ds"
          className={`mt-24 pt-16 sm:pt-20 transition-all duration-300 ${highlighted === "plutos-ds" ? highlightStyle : ""}`}
        >
          <h3 className="text-lg font-bold text-gray-800 mt-10 mb-1">플루토스디에스 (한빗코)</h3>
          <p className="text-gray-700 font-semibold mb-1">경영관리 / Manager | 2022.01 - 2023.12</p>
          <h4 className="text-base font-bold text-gray-600 mt-4 mb-1">핵심 키워드</h4>
          <ul className="list-disc pl-6 mb-2 text-gray-700 text-sm">
            <li>재무 관리 | 가상자산 관리 | 급여 제도 설계 | 리스크 관리 | 데이터 분석</li>
          </ul>
          <h4 className="text-base font-bold text-gray-600 mt-4 mb-1">세부 내용</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-2 bg-gray-50 rounded">
              <thead>
                <tr>
                  <th className="bg-blue-900 text-white font-bold py-2 px-3 w-1/5">구분</th>
                  <th className="bg-gray-100 text-gray-900 font-bold py-2 px-3">내용</th>
                </tr>
              </thead>
              <tbody className="text-sm text-black">
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">성과</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>코인마켓캡 API 연동으로 실시간 가상자산 시세 적용, 결산 자료 정확도 향상.</li>
                      <li>연봉 테이블 정규화로 급여 체계 개선, 리스크 관리 강화.</li>
                      <li>가상자산 실사보고서 작성으로 분기별 재무 투명성 제고.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">역할</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>월말/분기별 결산 진행 및 재무제표, 손익계산서 작성.</li>
                      <li>가상자산 수불부 작성: 코인/지갑별 실사 수량 주간 보고, 하드월렛 관리.</li>
                      <li>연봉 테이블 제작 및 급여 산출(약 60명), 사회보험 및 원천세 신고 관리.</li>
                      <li>재무 관리: 일일 자금수지 정리, Burn rate 관리.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">영향력/기여도</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>가상자산 데이터 기반 결산 체계로 재무 신뢰도 향상.</li>
                      <li>급여 제도 정규화로 인사 관리 효율성 증대.</li>
                      <li>리스크 관리 강화로 조직 안정성 제고.</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        {/* 주식회사 일로와 */}
        <section
          id="ilrowa"
          className={`mt-24 pt-16 sm:pt-20 transition-all duration-300 ${highlighted === "ilrowa" ? highlightStyle : ""}`}
        >
          <h3 className="text-lg font-bold text-gray-800 mt-10 mb-1">주식회사 일로와</h3>
          <p className="text-gray-700 font-semibold mb-1">경영지원 / 대리 | 2020.12 - 2021.03</p>
          <h4 className="text-base font-bold text-gray-600 mt-4 mb-1">핵심 키워드</h4>
          <ul className="list-disc pl-6 mb-2 text-gray-700 text-sm">
            <li>재무 관리 | 데이터화 | 프로세스 효율화</li>
          </ul>
          <h4 className="text-base font-bold text-gray-600 mt-4 mb-1">세부 내용</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-2 bg-gray-50 rounded">
              <thead>
                <tr>
                  <th className="bg-blue-900 text-white font-bold py-2 px-3 w-1/5">구분</th>
                  <th className="bg-gray-100 text-gray-900 font-bold py-2 px-3">내용</th>
                </tr>
              </thead>
              <tbody className="text-sm text-black">
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">성과</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>월결산 기간 50% 단축(외주 회계법인 의존 → 엑셀 분개장 전달).</li>
                      <li>자금 사용 데이터화로 보고 접근성 개선.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">역할</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>월별 손익계산서 작성 및 자금 수지내역 보고.</li>
                      <li>엑셀 분개장 작성 및 외주 회계법인과 교차 검증.</li>
                      <li>급여 산출 및 지급, 사회보험 및 원천세 신고 관리.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">영향력/기여도</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>자금 관리 투명성 향상.</li>
                      <li>결산 효율화로 경영진 보고 속도 개선.</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        {/* 고르라 */}
        <section
          id="gorura"
          className={`mt-24 pt-16 sm:pt-20 transition-all duration-300 ${highlighted === "gorura" ? highlightStyle : ""}`}
        >
          <h3 className="text-lg font-bold text-gray-800 mt-10 mb-1">고르라</h3>
          <p className="text-gray-700 font-semibold mb-1">경영관리 / 주임 | 2019.06 - 2020.08</p>
          <h4 className="text-base font-bold text-gray-600 mt-4 mb-1">핵심 키워드</h4>
          <ul className="list-disc pl-6 mb-2 text-gray-700 text-sm">
            <li>재무 관리 | 손익분석 | 급여 제도 설계</li>
          </ul>
          <h4 className="text-base font-bold text-gray-600 mt-4 mb-1">세부 내용</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-2 bg-gray-50 rounded">
              <thead>
                <tr>
                  <th className="bg-blue-900 text-white font-bold py-2 px-3 w-1/5">구분</th>
                  <th className="bg-gray-100 text-gray-900 font-bold py-2 px-3">내용</th>
                </tr>
              </thead>
              <tbody className="text-sm text-black">
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">성과</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>손익분기 보고서 대시보드화로 보고 주기 20% 단축.</li>
                      <li>시간외근무수당 제도 기획으로 급여 체계 개선.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">역할</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>자금일보 작성 및 월별 자금수지 정리, 프로젝트별 손익계산서 작성.</li>
                      <li>연봉 테이블 제작: 시간외근무수당 제도 기획, 인센티브제 도입.</li>
                      <li>급여 산출 및 지급, 사회보험 및 원천세 신고 관리.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">영향력/기여도</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>경영 보고 체계 개선.</li>
                      <li>급여 제도 개선으로 직원 만족도 향상.</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        {/* (주)태대산 */}
        <section
          id="taedaesan"
          className={`mt-24 pt-16 sm:pt-20 transition-all duration-300 ${highlighted === "taedaesan" ? highlightStyle : ""}`}
        >
          <h3 className="text-lg font-bold text-gray-800 mt-10 mb-1">(주)태대산</h3>
          <p className="text-gray-700 font-semibold mb-1">경영지원 / 대리 | 2018.08 - 2019.04</p>
          <h4 className="text-base font-bold text-gray-600 mt-4 mb-1">핵심 키워드</h4>
          <ul className="list-disc pl-6 mb-2 text-gray-700 text-sm">
            <li>급여 관리 | 계약 관리 | 비용 절감</li>
          </ul>
          <h4 className="text-base font-bold text-gray-600 mt-4 mb-1">세부 내용</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-2 bg-gray-50 rounded">
              <thead>
                <tr>
                  <th className="bg-blue-900 text-white font-bold py-2 px-3 w-1/5">구분</th>
                  <th className="bg-gray-100 text-gray-900 font-bold py-2 px-3">내용</th>
                </tr>
              </thead>
              <tbody className="text-sm text-black">
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">성과</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>계약 관리 개선으로 비용 절감.</li>
                      <li>급여 체계 정규화로 운영 효율성 증대.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">역할</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>급여 산출 및 지급, 사회보험 및 원천세 신고 관리.</li>
                      <li>계약 관리: 업체별 계약서 검토, 해지 예정 업체 조율.</li>
                      <li>구매 및 발주: 비품 발주 및 단가 관리.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-200 font-bold py-2 px-3 align-top">영향력/기여도</td>
                  <td className="bg-white py-2 px-3">
                    <ul className="list-disc pl-5">
                      <li>운영 비용 절감으로 재무 효율성 증대.</li>
                      <li>계약 관리 체계화로 조직 안정성 강화.</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        {/* 마지막 요약 */}
        <h2 className="text-xl font-bold text-blue-900 mt-12 mb-2">요약</h2>
        <p className="mb-2 text-gray-700">슈퍼빌런랩스와 플루토스디에스에서 재무 관리, 가상자산 관리, 급여 제도 설계를 주도하며 조직의 효율성과 투명성을 극대화했습니다. AI 및 파워쿼리를 활용한 데이터 처리와 시각화로 경영진의 의사결정을 지원하며, 변화하는 환경에 유연하게 대응합니다.</p>
      </div>
    </>
  );
}
