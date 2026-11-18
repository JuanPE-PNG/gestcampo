import { PhaseCard } from '@/components/phase-card';
import { Screen } from '@/components/screen';

export default function InformesScreen() {
  return (
    <Screen
      title="Informes"
      subtitle="Totales del día, la semana, el mes o el año.">
      <PhaseCard
        fase="FASE F5"
        titulo="PDF y Excel"
        descripcion="Los informes se generan en el teléfono, sin internet. Salen en PDF para entregar y en Excel para seguir trabajando los números."
        puntos={[
          'Desglose por categoría y por equipo.',
          'Exportación a Excel con hojas de resumen.',
          'Historial de informes generados.',
        ]}
      />
    </Screen>
  );
}
