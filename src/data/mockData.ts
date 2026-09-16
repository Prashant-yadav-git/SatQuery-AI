import { AnalysisItem } from '../types';

export const SUGGESTIONS = [
  'Show urban growth in Delhi',
  'Detect illegal mining',
  'Analyze crop health',
  'Track flood changes',
];

export function createAnalysisFromQuery(query: string): AnalysisItem {
  const lower = query.toLowerCase();
  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  if (lower.includes('urban') || lower.includes('delhi') || lower.includes('city') || lower.includes('building')) {
    return {
      id: `analysis-${Date.now()}`,
      title: 'Urban Expansion Analysis - Delhi NCR',
      category: 'Urban',
      date: dateStr,
      thumbnail: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
      t1Image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
      t2Image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
      changeMask: 'linear-gradient(135deg, rgba(168, 85, 247, 0.45) 0%, rgba(236, 72, 153, 0.4) 100%)',
      query,
      model: 'SatQuery Siamese-UrbanNet v2.4',
      metrics: {
        changedAreaKm2: 21.4,
        changedAreaPct: 8.9,
        iou: 68.2,
        precision: 74.5,
        recall: 71.0,
        f1: 72.7,
      },
      summary: 'Detected 21.4 km² of newly built-up impervious surfaces and infrastructure development over the observed multi-temporal interval.',
      trace: [
        'Query parsed: Urban expansion & built-up spatial change detection',
        'Ingested paired orthorectified multi-spectral optical tiles',
        'Normalized Difference Built-up Index (NDBI) computed',
        'Deep Siamese convolutional feature comparison completed',
        'Binary change mask & vector boundaries generated',
      ],
    };
  }

  if (lower.includes('crop') || lower.includes('agri') || lower.includes('farm') || lower.includes('vegetation')) {
    return {
      id: `analysis-${Date.now()}`,
      title: 'Vegetation & Crop Health Monitoring',
      category: 'Agriculture',
      date: dateStr,
      thumbnail: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
      t1Image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      t2Image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80',
      changeMask: 'linear-gradient(135deg, rgba(34, 197, 94, 0.4) 0%, rgba(234, 179, 8, 0.45) 100%)',
      query,
      model: 'AgriVLM-OpticalSAR v1.4',
      metrics: {
        changedAreaKm2: 38.6,
        changedAreaPct: 12.3,
        iou: 76.4,
        precision: 88.2,
        recall: 84.1,
        f1: 86.1,
      },
      summary: 'Canopy vitality analysis identified healthy crop growth across the sector, with localized moisture anomalies flagged for review.',
      trace: [
        'Query parsed: Multi-temporal agricultural crop vigor assessment',
        'Sentinel-2 BOA surface reflectance tiles ingested',
        'NDVI & EVI calculated across time steps',
        'Vegetation anomaly detection pipeline evaluated',
      ],
    };
  }

  if (lower.includes('flood') || lower.includes('water') || lower.includes('river')) {
    return {
      id: `analysis-${Date.now()}`,
      title: 'Hydrological Surface Water & Flood Extent',
      category: 'Environment',
      date: dateStr,
      thumbnail: 'https://images.unsplash.com/photo-1524338198850-8a2ff63aaceb?auto=format&fit=crop&w=800&q=80',
      t1Image: 'https://images.unsplash.com/photo-1524338198850-8a2ff63aaceb?auto=format&fit=crop&w=1200&q=80',
      t2Image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
      changeMask: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.4) 100%)',
      query,
      model: 'HydroTemporalNet v3',
      metrics: {
        changedAreaKm2: 28.5,
        changedAreaPct: 11.2,
        iou: 71.3,
        precision: 78.4,
        recall: 82.0,
        f1: 80.1,
      },
      summary: 'Water extent thresholding detected 28.5 km² of inundated flood plain and dynamic shoreline displacement.',
      trace: [
        'Query parsed: Hydrological surface water boundary shift',
        'Modified Normalized Difference Water Index (MNDWI) computed',
        'Flood inundation mask generated and georeferenced',
      ],
    };
  }

  // Default custom analysis
  return {
    id: `analysis-${Date.now()}`,
    title: query.length > 30 ? `${query.slice(0, 30)}...` : query,
    category: 'Environment',
    date: dateStr,
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    t1Image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    t2Image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    changeMask: 'linear-gradient(135deg, rgba(239, 68, 68, 0.45) 0%, rgba(249, 115, 22, 0.35) 100%)',
    query,
    model: 'T1T2ChangeDetector v2.1',
    metrics: {
      changedAreaKm2: 15.2,
      changedAreaPct: 6.4,
      iou: 65.0,
      precision: 70.2,
      recall: 68.5,
      f1: 69.3,
    },
    summary: `Bi-temporal analysis completed for "${query}". Detected 15.2 km² of spatial feature variance between T1 baseline and T2 observation.`,
    trace: [
      `Query interpreted: "${query}"`,
      'Bi-temporal satellite tile pair validated and coregistered',
      'Feature subtraction & change probability map generated',
    ],
  };
}
