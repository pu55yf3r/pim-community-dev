<?php

declare(strict_types=1);

namespace Akeneo\Pim\Enrichment\Component\Product\Query\QuantifiedAssociation;

use Akeneo\Pim\Enrichment\Component\Product\Model\QuantifiedAssociation\IdMapping;

/**
 * Provides id mapping from product model codes
 *
 * @author    Julien Sanchez <julien@akeneo.com>
 * @copyright 2020 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
interface GetIdMappingFromProductModelCodesQueryInterface
{
    /**
     * @param string[] $productModelCodes
     *
     * @return IdMapping
     */
    public function execute(array $productModelCodes): IdMapping;
}
