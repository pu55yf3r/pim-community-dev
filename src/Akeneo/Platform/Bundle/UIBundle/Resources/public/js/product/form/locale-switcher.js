'use strict';
/**
 * Locale switcher extension
 *
 * @author    Julien Sanchez <julien@akeneo.com>
 * @author    Filips Alpe <filips@akeneo.com>
 * @copyright 2015 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
define(
    [
        'underscore',
        'oro/translator',
        'pim/form',
        'pim/template/product/locale-switcher',
        'pim/fetcher-registry',
        'pim/i18n',
        'pim/user-context',
    ],
    function (
        _,
        __,
        BaseForm,
        template,
        FetcherRegistry,
        i18n,
        UserContext
    ) {
        return BaseForm.extend({
            template: _.template(template),
            className: 'AknDropdown AknButtonList-item locale-switcher',
            events: {
                'click li span[data-locale]': 'changeLocale'
            },
            displayInline: false,
            displayLabel: true,
            config: {},
            selectedLocale: null,

            /**
             * {@inheritdoc}
             */
            initialize: function (config) {
                if (undefined !== config) {
                    this.config = config.config;
                }

                BaseForm.prototype.initialize.apply(this, arguments);
            },

            /**
             * {@inheritdoc}
             */
            configure: function () {
                this.listenTo(this.getRoot(), 'pim_enrich:form:locale_switcher:change', function (localeEvent) {
                    if ('base_product' === localeEvent.context) {
                        this.render();
                    }
                }.bind(this));
            },

            /**
             * {@inheritdoc}
             */
            render: function () {
                this.getDisplayedLocales()
                    .done(function (locales) {
                        this.$el.removeClass('open');

                        const params = {};
                        this.getRoot().trigger('pim_enrich:form:locale_switcher:pre_render', params);

                        const defaultLocaleCode = this.selectedLocale ?
                            this.selectedLocale :
                            (params.localeCode ? params.localeCode : UserContext.get('catalogLocale'));

                        let currentLocale = defaultLocaleCode && locales.find(locale => {
                            return locale.code === defaultLocaleCode;
                        });

                        if (undefined === currentLocale) {
                            currentLocale = _.first(locales);
                        }

                        this.$el.html(
                            this.template({
                                locales: locales,
                                currentLocale,
                                i18n: i18n,
                                displayInline: this.displayInline,
                                displayLabel: this.displayLabel,
                                label: __('pim_enrich.entity.locale.uppercase_label')
                            })
                        );
                        this.delegateEvents();
                    }.bind(this));

                return this;
            },

            /**
             * Retrieve locales to display in the locale switcher
             *
             * @returns {Promise}
             */
            getDisplayedLocales: function () {
                return FetcherRegistry.getFetcher('locale').fetchActivated();
            },

            /**
             * Method triggered on the 'change locale' event
             *
             * @param {Object} event
             */
            changeLocale: function (event) {
                this.getRoot().trigger('pim_enrich:form:locale_switcher:change', {
                    localeCode: event.currentTarget.dataset.locale,
                    context: this.config.context
                });
                this.selectedLocale = event.currentTarget.dataset.locale;

                this.render();
            },

            /**
             * Updates the inline display value
             *
             * @param {Boolean} value
             */
            setDisplayInline: function (value) {
                this.displayInline = value;
            },

            /**
             * Updates the display label value
             *
             * @param {Boolean} value
             */
            setDisplayLabel: function (value) {
                this.displayLabel = value;
            }
        });
    }
);
