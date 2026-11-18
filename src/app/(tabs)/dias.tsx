import { PhaseCard } from '@/components/phase-card';
import { Screen } from '@/components/screen';

export default function DiasScreen() {
  return (
    <Screen
      title="Días"
      subtitle="Cada fecha con lo que se gastó, para revisar y corregir.">
      <PhaseCard
        fase="FASE F4"
        titulo="Vista por día"
        descripcion="Lista de fechas desde el primer registro. Al abrir un día se ven sus gastos, se corrigen y se agregan los que falten. Ningún día se cierra: todo se puede editar siempre."
        puntos={[
          'Indicadores de pendientes y total del día.',
          'Edición y carga manual de gastos.',
          'Categorías creadas por el usuario.',
        ]}
      />
    </Screen>
  );
}
